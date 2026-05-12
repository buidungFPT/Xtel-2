import { useEffect, useMemo, useState } from "react";
import Cart from "../componets/cart";
import ProductItem from "../componets/ProductItem";
import Category from "../componets/Category/category";
import Search from "../componets/search";
import SortPrice from "../componets/sortPrice";
import { getProducts, getCategories, getDataArray } from "../services/api";
import CheckoutForm from "../componets/Order/CheckOutform";
import { createOrder } from "../services/api";
import { handleLogout } from "../services/api";
import { Link } from "react-router-dom";
const token = localStorage.getItem("token");

const user = JSON.parse(localStorage.getItem("user"));
function User() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [products, setProducts] = useState([]);
  const [categoriesForm, setCategoriesForm] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortPrice, setSortPrice] = useState("default");

  async function fetchData() {
    try {
      const productResult = await getProducts();
      const categoryResult = await getCategories();

      setProducts(productResult.data);
      setCategoriesForm(categoryResult.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 0);

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleSubCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.id === product.id);

      if (exist) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleIncreaseQuantity = (productId) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const handleDecreaseQuantity = (productId) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const handleRemoveCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const filterProducts = useMemo(() => {
    let result = products.filter((item) => {
      const matchSearch = item.name
        .toLowerCase()
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
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sortPrice === "desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, search, category, sortPrice]);

  //////////Order///////
  const handleSubmitOrder = async (customer) => {
    try {
      const payload = {
        customer_name: customer.customer_name,
        phone: customer.phone,
        address: customer.address,
        items: cart.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
      };

      const result = await createOrder(payload);

      if (result.data) {
        alert("Đặt hàng thành công");
        setCart([]);
        fetchData();
      } else {
        alert(result.message || "Đặt hàng thất bại");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const totalMoney = useMemo(() => {
    return cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }, [cart]);

  return (
    <main className="user-site">
      {/* HEADER */}
      <header className="coffee-header">
        <div className="coffee-logo">ChunChun Coffee</div>

        <nav className="coffee-nav">
          <a href="#home">Trang chủ</a>
          <a href="#menu">Menu</a>
          <a href="#about">Giới thiệu</a>
          <a href="#deals">Ưu đãi</a>
          {token && user ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
              }}
            >
              <div
                style={{
                  color: "#f6c56b",
                  fontWeight: "700",
                }}
              >
                {user.email}
              </div>

              <button
                style={{
                  padding: "10px 16px",
                  borderRadius: "10px",
                  background: "#c57b39",
                  color: "white",
                  fontWeight: "700",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={handleLogout}
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <>
              <a href="/login">Đăng nhập</a>

              <a href="/register">Đăng ký</a>
            </>
          )}
        </nav>
      </header>

      {/* HERO */}
      <section className="hero-section" id="home">
        <div className="hero-content">
          <p className="hero-subtitle">Fresh Coffee & Milk Tea</p>
          <h1>ChunChun Coffee</h1>
          <p>
            Không gian ấm cúng, đồ uống chất lượng, hương vị phù hợp cho mọi
            ngày.
          </p>

          <div className="hero-actions">
            <a href="#menu" className="btn-primary">
              Xem menu
            </a>
            <a href="#contact" className="btn-secondary">
              Đặt bàn ngay
            </a>
          </div>
        </div>
      </section>

      {/* CATEGORY */}
      <section className="section category-section">
        <div className="section-title">
          <h2>Danh mục sản phẩm</h2>
          <p>Chọn nhanh loại đồ uống bạn yêu thích</p>
        </div>

        <div className="category-tabs">
          <Category
            category={category}
            setCategory={setCategory}
            categoriesForm={categoriesForm}
          />
        </div>
      </section>

      {/* MENU */}
      <section className="section menu-section" id="menu">
        <div className="section-title">
          <h2>Sản phẩm nổi bật</h2>
          <p>Những món được khách hàng yêu thích nhất</p>
        </div>

        <div className="menu-tools">
          <Search search={search} setSearch={setSearch} />
          <SortPrice sortPrice={sortPrice} setSortPrice={setSortPrice} />
        </div>

        <div className="user-menu-layout">
          <ProductItem
            mode="user"
            filterProducts={filterProducts}
            handleSubCart={handleSubCart}
          />

          <Cart
            cart={cart}
            totalMoney={totalMoney}
            handleIncreaseQuantity={handleIncreaseQuantity}
            handleDecreaseQuantity={handleDecreaseQuantity}
            handleRemoveCart={handleRemoveCart}
          />
          <CheckoutForm cart={cart} onSubmitOrder={handleSubmitOrder} />
        </div>
      </section>

      {/* ABOUT */}
      <section className="section about-section" id="about">
        <div className="about-image"></div>

        <div className="about-content">
          <p className="section-label">Về chúng tôi</p>
          <h2>Không gian cafe ấm cúng cho mọi cuộc hẹn</h2>
          <p>
            ChunChun Coffee mang đến đồ uống chất lượng, nguyên liệu chọn lọc và
            không gian thư giãn phù hợp để học tập, làm việc hoặc gặp gỡ bạn bè.
          </p>
        </div>
      </section>

      {/* DEALS */}
      <section className="section deals-section" id="deals">
        <div>
          <p className="section-label">Ưu đãi hôm nay</p>
          <h2>Combo Coffee + Bánh ngọt</h2>
          <p>Giảm ngay 20% cho combo buổi sáng từ 7:00 - 10:00.</p>
        </div>

        <a href="#menu" className="btn-primary">
          Xem ưu đãi
        </a>
      </section>

      {/* REVIEWS */}
      <section className="section review-section">
        <div className="section-title">
          <h2>Đánh giá khách hàng</h2>
          <p>Cảm nhận từ những khách hàng đã ghé ChunChun Coffee</p>
        </div>

        <div className="review-grid">
          <div className="review-card">
            <h3>Minh Anh</h3>
            <p className="stars">★★★★★</p>
            <p>Đồ uống ngon, không gian rất chill và nhân viên thân thiện.</p>
          </div>

          <div className="review-card">
            <h3>Tuấn Nam</h3>
            <p className="stars">★★★★★</p>
            <p>Cà phê sữa rất hợp vị, giá hợp lý, sẽ quay lại.</p>
          </div>

          <div className="review-card">
            <h3>Hoài Thu</h3>
            <p className="stars">★★★★☆</p>
            <p>Trà sữa thơm, topping nhiều, quán decor đẹp.</p>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section contact-section" id="contact">
        <div className="section-title">
          <h2>Liên hệ / Đặt bàn</h2>
          <p>Để lại thông tin, ChunChun Coffee sẽ liên hệ lại với bạn</p>
        </div>

        <form className="booking-form">
          <input type="text" placeholder="Họ tên" />
          <input type="text" placeholder="Số điện thoại" />
          <input type="datetime-local" />
          <input type="number" placeholder="Số người" />
          <textarea placeholder="Ghi chú"></textarea>
          <button type="button" className="btn-primary">
            Gửi thông tin
          </button>
        </form>
      </section>

      {/* FOOTER */}
      <footer className="coffee-footer">
        <div>
          <h2>ChunChun Coffee</h2>
          <p>Không gian cafe ấm cúng, đồ uống chất lượng.</p>
        </div>

        <div>
          <h3>Liên hệ</h3>
          <p>Địa chỉ: Hà Nội, Việt Nam</p>
          <p>SĐT: 0349 426 343</p>
        </div>

        <div>
          <h3>Mạng xã hội</h3>
          <p>Facebook / TikTok / Instagram</p>
        </div>

        <div>
          <h3>Giờ mở cửa</h3>
          <p>07:00 - 22:30 mỗi ngày</p>
        </div>
      </footer>
    </main>
  );
}

export default User;
