import { useEffect, useMemo, useState } from "react";

import {
  getProducts,
  getCategories,
  createOrder,
} from "../services/api";

import UserHeader from "./user/UserHeader";
import HeroSection from "./user/HeroSection";
import MenuSection from "./user/MenuSection";

function User() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [products, setProducts] = useState([]);
  const [categoriesForm, setCategoriesForm] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortPrice, setSortPrice] = useState("default");

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  async function fetchData() {
    try {
      const productResult = await getProducts();
      const categoryResult = await getCategories();

      setProducts(productResult.data || []);
      setCategoriesForm(categoryResult.data || []);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const filterProducts = useMemo(() => {
    let result = [...products];

    result = result.filter((item) => {
      const matchSearch = item.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const productCategoryName =
        item.category?.name || item.category_name || item.category;

      const productCategoryId = item.category_id || item.category?.id;

      const matchCategory =
        category === "all" ||
        String(productCategoryName) === String(category) ||
        String(productCategoryId) === String(category);

      return matchSearch && matchCategory;
    });

    if (sortPrice === "asc") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (sortPrice === "desc") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    }

    return result;
  }, [products, search, category, sortPrice]);

  const handleSubCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.id === product.id);

      if (exist) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                cartQuantity: item.cartQuantity + 1,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          cartQuantity: 1,
        },
      ];
    });
  };

  const handleIncreaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              cartQuantity: item.cartQuantity + 1,
            }
          : item
      )
    );
  };

  const handleDecreaseQuantity = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                cartQuantity: item.cartQuantity - 1,
              }
            : item
        )
        .filter((item) => item.cartQuantity > 0)
    );
  };

  const handleRemoveCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

 const totalMoney = cart.reduce((total, item) => {
  const quantity = Number(item.cartQuantity || item.quantity || 1);
  const price = Number(item.price || 0);

  return total + price * quantity;
}, 0);

  const handleSubmitOrder = async (customerInfo) => {
    try {
      if (cart.length === 0) {
        alert("Giỏ hàng đang trống");
        return;
      }

      const orderData = {
        ...customerInfo,
        items: cart.map((item) => ({
          product_id: item.id,
          quantity: item.cartQuantity,
          price: item.price,
        })),
        total_price: totalMoney,
      };

      await createOrder(orderData);

      alert("Đặt hàng thành công");
      setCart([]);
      localStorage.removeItem("cart");
    } catch (error) {
      console.log(error);
      alert("Đặt hàng thất bại");
    }
  };

  return (
    <main className="user-site">
      <UserHeader
        token={token}
        user={user}
        handleLogout={handleLogout}
      />

      <HeroSection />

      <MenuSection
        category={category}
        setCategory={setCategory}
        categoriesForm={categoriesForm}
        search={search}
        setSearch={setSearch}
        sortPrice={sortPrice}
        setSortPrice={setSortPrice}
        filterProducts={filterProducts}
        handleSubCart={handleSubCart}
        cart={cart}
        totalMoney={totalMoney}
        handleIncreaseQuantity={handleIncreaseQuantity}
        handleDecreaseQuantity={handleDecreaseQuantity}
        handleRemoveCart={handleRemoveCart}
        handleSubmitOrder={handleSubmitOrder}
      />
    </main>
  );
}

export default User;