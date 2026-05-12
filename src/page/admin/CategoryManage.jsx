import { useCallback, useEffect, useState } from "react";
import CategoryForm from "../../componets/Category/CategoryForm";
import { getCategories, getDataArray } from "../../services/api";

function CategoryManage() {
  const [categoriesForm, setCategoriesForm] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const categoryResult = await getCategories();
      setCategoriesForm(getDataArray(categoryResult));
    } catch (error) {
      console.log(error);
      alert(error.message || "Không thể tải danh mục");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <section className="admin-page">
      <div className="admin-section-title">
        <h1>Quản lý danh mục</h1>
        <p>Thêm, sửa, xóa danh mục sản phẩm.</p>
      </div>

      <div className="admin-management single-column">
        <section className="admin-card">
          <CategoryForm categoriesForm={categoriesForm} fetchData={fetchData} />
        </section>
      </div>
    </section>
  );
}

export default CategoryManage;
