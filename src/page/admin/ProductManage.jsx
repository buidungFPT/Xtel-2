import { useCallback, useEffect, useMemo, useState } from "react";
import ItemForm from "../../componets/ItemForm";
import ProductItem from "../../componets/ProductItem";
import Category from "../../componets/Category/category";
import Search from "../../componets/search";
import SortPrice from "../../componets/sortPrice";

import {
  createProduct,
  deleteProduct,
  getCategories,
  getDataArray,
  getProducts,
  updateProduct,
} from "../../services/api";

const initialForm = {
  name: "",
  price: "",
  quantity: "",
  category_id: "",
  description: "",
  image: "",
};

function ProductManage() {
  const [products, setProducts] = useState([]);
  const [categoriesForm, setCategoriesForm] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortPrice, setSortPrice] = useState("default");
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const [productResult, categoryResult] = await Promise.all([
        getProducts(),
        getCategories(),
      ]);

      setProducts(getDataArray(productResult));
      setCategoriesForm(getDataArray(categoryResult));
    } catch (error) {
      console.log(error);
      alert(error.message || "Không thể tải dữ liệu sản phẩm");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const resetForm = () => {
    setForm(initialForm);
    setEditId(null);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) return alert("Tên sản phẩm không được để trống");
    if (!form.price || Number(form.price) <= 0) return alert("Giá sản phẩm phải lớn hơn 0");
    if (!form.quantity || Number(form.quantity) < 0) return alert("Số lượng không hợp lệ");
    if (!form.category_id) return alert("Vui lòng chọn danh mục");

    const payload = {
      name: form.name.trim(),
      price: Number(form.price),
      quantity: Number(form.quantity),
      category_id: Number(form.category_id),
      description: form.description || "",
      image: form.image || "",
    };

    try {
      if (editId) {
        await updateProduct(editId, payload);
        alert("Cập nhật sản phẩm thành công");
      } else {
        await createProduct(payload);
        alert("Thêm sản phẩm thành công");
      }

      await fetchData();
      resetForm();
    } catch (error) {
      console.log(error);
      alert(error.message || "Lưu sản phẩm thất bại");
    }
  };

  const handleEdit = (product) => {
    setEditId(product.id);

    setForm({
      name: product.name || "",
      price: product.price || "",
      quantity: product.quantity || "",
      category_id: product.category_id || product.category?.id || "",
      description: product.description || "",
      image: product.image || "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;

    try {
      await deleteProduct(id);
      await fetchData();
      alert("Xóa sản phẩm thành công");
    } catch (error) {
      console.log(error);
      alert(error.message || "Xóa sản phẩm thất bại");
    }
  };

  const filterProducts = useMemo(() => {
    let result = products.filter((item) => {
      const productName = item.name || "";
      const matchSearch = productName.toLowerCase().includes(search.toLowerCase());

      const productCategoryName = item.category?.name || item.category_name || item.category || "";
      const productCategoryId = item.category_id || item.category?.id || "";

      const matchCategory =
        category === "all" ||
        String(productCategoryName) === String(category) ||
        String(productCategoryId) === String(category);

      return matchSearch && matchCategory;
    });

    if (sortPrice === "asc") {
      result = [...result].sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (sortPrice === "desc") {
      result = [...result].sort((a, b) => Number(b.price) - Number(a.price));
    }

    return result;
  }, [products, search, category, sortPrice]);

  return (
    <section className="admin-page product-manage-page">
      <div className="admin-section-title">
        <h1>Quản lý sản phẩm</h1>
        <p>Thêm, sửa, xóa và kiểm soát sản phẩm của quán.</p>
      </div>

      <div className="admin-filter-section">
        <Search search={search} setSearch={setSearch} />

        <Category
          category={category}
          setCategory={setCategory}
          categoriesForm={categoriesForm}
        />

        <SortPrice sortPrice={sortPrice} setSortPrice={setSortPrice} />
      </div>

      <div className="admin-management product-layout">
        <section className="admin-card product-form-card">
          <ItemForm
            form={form}
            setForm={setForm}
            handleSubmitForm={handleSubmitForm}
            editId={editId}
            categoriesForm={categoriesForm}
            resetForm={resetForm}
          />
        </section>

        <section className="admin-card admin-products-panel">
          <div className="table-header">
            <div>
              <h2>Danh sách sản phẩm</h2>
              <p>{loading ? "Đang tải dữ liệu..." : "Quản lý các sản phẩm đang bán"}</p>
            </div>
          </div>

          <ProductItem
            mode="admin"
            filterProducts={filterProducts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </section>
      </div>
    </section>
  );
}

export default ProductManage;
