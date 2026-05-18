import { useState } from "react";

function ItemForm({
  form,
  setForm,
  handleSubmitForm,
  editId,
  categoriesForm = [],
  resetForm,
}) {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setForm((prev) => ({
      ...prev,
      image: file,
    }));

    setErrors((prev) => ({
      ...prev,
      image: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.name?.trim()) {
      newErrors.name = "Vui lòng nhập tên sản phẩm";
    }

    if (!form.price) {
      newErrors.price = "Vui lòng nhập giá sản phẩm";
    } else if (Number(form.price) <= 0) {
      newErrors.price = "Giá sản phẩm phải lớn hơn 0";
    }

    if (!form.category_id) {
      newErrors.category_id = "Vui lòng chọn danh mục";
    }

    if (form.quantity === "" || form.quantity === undefined) {
      newErrors.quantity = "Vui lòng nhập số lượng";
    } else if (Number(form.quantity) < 0) {
      newErrors.quantity = "Số lượng không được âm";
    }

    if (!editId && !form.image) {
      newErrors.image = "Vui lòng chọn ảnh sản phẩm";
    }

    if (form.description && form.description.length > 500) {
      newErrors.description = "Mô tả không được quá 500 ký tự";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitValidate = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      await handleSubmitForm(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-box" onSubmit={handleSubmitValidate}>
      <h2>{editId ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}</h2>

      <div className="form-group">
        <label>Tên sản phẩm</label>
        <input
          type="text"
          name="name"
          placeholder="Tên sản phẩm"
          value={form.name || ""}
          onChange={handleChange}
        />
        {errors.name && <p className="error-text">{errors.name}</p>}
      </div>

      <div className="form-group">
        <label>Giá sản phẩm</label>
        <input
          type="number"
          name="price"
          placeholder="Giá sản phẩm"
          value={form.price || ""}
          onChange={handleChange}
        />
        {errors.price && <p className="error-text">{errors.price}</p>}
      </div>

      <div className="form-group">
        <label>Danh mục</label>
        <select
          name="category_id"
          value={form.category_id || ""}
          onChange={handleChange}
        >
          <option value="">-- Chọn danh mục --</option>
          {categoriesForm.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        {errors.category_id && (
          <p className="error-text">{errors.category_id}</p>
        )}
      </div>

      <div className="form-group">
        <label>Số lượng</label>
        <input
          type="number"
          name="quantity"
          placeholder="Số lượng sản phẩm"
          value={form.quantity || ""}
          onChange={handleChange}
        />
        {errors.quantity && <p className="error-text">{errors.quantity}</p>}
      </div>

      <div className="form-group">
        <label>Ảnh sản phẩm</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {errors.image && <p className="error-text">{errors.image}</p>}
      </div>

      <div className="form-group">
        <label>Mô tả</label>
        <textarea
          name="description"
          placeholder="Mô tả sản phẩm"
          value={form.description || ""}
          onChange={handleChange}
        />
        {errors.description && (
          <p className="error-text">{errors.description}</p>
        )}
      </div>

      <button className="form-btn" type="submit" disabled={loading}>
        {loading ? "Đang xử lý..." : editId ? "Cập nhật" : "Thêm sản phẩm"}
      </button>

      {editId && (
        <button
          className="cancel-btn"
          type="button"
          onClick={resetForm}
          disabled={loading}
        >
          Hủy cập nhật
        </button>
      )}
    </form>
  );
}

export default ItemForm;