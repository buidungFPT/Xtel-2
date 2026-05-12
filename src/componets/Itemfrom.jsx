function ItemForm({
  form,
  setForm,
  handleSubmitForm,
  editId,
  categoriesForm = [],
  resetForm,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <form className="form-box" onSubmit={handleSubmitForm}>
      <h2>{editId ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}</h2>

      <div className="form-group">
        <label>Tên sản phẩm</label>
        <input
          type="text"
          name="name"
          placeholder="Tên sản phẩm"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Giá sản phẩm</label>
        <input
          type="number"
          name="price"
          placeholder="Giá sản phẩm"
          value={form.price}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Danh mục</label>
        <select name="category_id" value={form.category_id} onChange={handleChange}>
          <option value="">-- Chọn danh mục --</option>
          {categoriesForm.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Số lượng</label>
        <input
          type="number"
          name="quantity"
          placeholder="Số lượng sản phẩm"
          value={form.quantity}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Ảnh sản phẩm</label>
        <input
          type="text"
          name="image"
          placeholder="Link ảnh sản phẩm"
          value={form.image}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Mô tả</label>
        <textarea
          name="description"
          placeholder="Mô tả sản phẩm"
          value={form.description}
          onChange={handleChange}
        />
      </div>

      <button className="form-btn" type="submit">
        {editId ? "Cập nhật" : "Thêm sản phẩm"}
      </button>

      {editId && (
        <button className="cancel-btn" type="button" onClick={resetForm}>
          Hủy cập nhật
        </button>
      )}
    </form>
  );
}

export default ItemForm;
