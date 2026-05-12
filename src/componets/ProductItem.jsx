function ProductItem({
  mode = "user",
  filterProducts = [],
  handleSubCart,
  handleEdit,
  handleDelete,
}) {
  return (
    <div className="product-list">
      {filterProducts.length === 0 ? (
        <p className="empty">Không tìm thấy sản phẩm</p>
      ) : (
        <div className="product-grid">
          {filterProducts.map((item) => (
            <div className="product-card" key={item.id}>
              {item.image && (
                <img src={item.image} alt={item.name} className="product-image" />
              )}

              <h3>{item.name}</h3>

              <p>
                Giá: <strong>{Number(item.price || 0).toLocaleString()}đ</strong>
              </p>

              <p>Danh mục: {item.category?.name || item.category_name || "Chưa có"}</p>

              {Number(item.quantity) > 0 ? (
                <p className="product-quantity in-stock">
                  Còn hàng: <strong>{item.quantity}</strong>
                </p>
              ) : (
                <p className="product-quantity out-stock">Hết hàng</p>
              )}

              <div className="product-actions">
                {mode === "user" && (
                  <button
                    className="btn-cart"
                    disabled={Number(item.quantity) <= 0}
                    onClick={() => handleSubCart?.(item)}
                  >
                    Add to Cart
                  </button>
                )}

                {mode === "admin" && (
                  <>
                    <button className="btn-edit" onClick={() => handleEdit?.(item)}>
                      EDIT
                    </button>

                    <button className="btn-delete" onClick={() => handleDelete?.(item.id)}>
                      DELETE
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductItem;
