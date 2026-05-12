import { useState } from "react";
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../services/api";

function CategoryForm({ categoriesForm, fetchData }) {
  const [categoryName, setCategoryName] = useState("");
  const [editCategoryId, setEditCategoryId] = useState(null);

  const resetCategoryForm = () => {
    setCategoryName("");
    setEditCategoryId(null);
  };

  const handleSubmitCategory = async (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      alert("Vui lòng nhập tên danh mục");
      return;
    }

    try {
      if (editCategoryId !== null) {
        await updateCategory(editCategoryId, {
          name: categoryName.trim(),
        });
      } else {
        await createCategory({
          name: categoryName.trim(),
        });
      }

      await fetchData();
      resetCategoryForm();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditCategory = (category) => {
    setCategoryName(category.name);
    setEditCategoryId(category.id);
  };

  const handleDeleteCategory = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa danh mục này?");

    if (!confirmDelete) return;

    try {
      await deleteCategory(id);
      await fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="category-box">
      <h2>Quản lý danh mục</h2>

      <form onSubmit={handleSubmitCategory} className="category-form">
        <input
          type="text"
          placeholder="Nhập tên danh mục"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />

        <button type="submit" className="form-btn">
          {editCategoryId !== null ? "Cập nhật" : "Thêm"}
        </button>

        {editCategoryId !== null && (
          <button
            type="button"
            className="cancel-btn"
            onClick={resetCategoryForm}
          >
            Hủy
          </button>
        )}
      </form>

      <div className="category-list">
        {categoriesForm.map((item) => (
          <div className="category-item" key={item.id}>
            <span>{item.name}</span>

            <div className="category-actions">
              <button
                className="btn-edit"
                onClick={() => handleEditCategory(item)}
              >
                Sửa
              </button>

              <button
                className="btn-delete"
                onClick={() => handleDeleteCategory(item.id)}
              >
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryForm;
