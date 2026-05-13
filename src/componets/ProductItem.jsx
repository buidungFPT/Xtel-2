const BASE_URL = "http://localhost:8000";

function ProductItem({
  mode = "user",
  filterProducts = [],
  handleSubCart,
  handleEdit,
  handleDelete,
}) {
  const getImageUrl = (image) => {
    if (!image) {
      return "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80";
    }

    if (image.startsWith("http")) {
      return image;
    }

    if (image.startsWith("/storage")) {
      return `${BASE_URL}${image}`;
    }

    return `${BASE_URL}/storage/${image}`;
  };

  return (
    <div className="product-list">
      {filterProducts.length === 0 ? (
        <p className="empty">Không tìm thấy sản phẩm</p>
      ) : (
        <div className="product-grid">
          {filterProducts.map((item) => (
            <div className="product-card" key={item.id}>
              <img
                src={getImageUrl(item.image)}
                alt={item.name}
                className="product-image"
              />

              <h3>{item.name}</h3>

              <p>
                Giá: <strong>{Number(item.price || 0).toLocaleString()}đ</strong>
              </p>

              <p>
                Danh mục: {item.category?.name || item.category_name || "Chưa có"}
              </p>

              {item.description && <p>{item.description}</p>}

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
                    onClick={() => handleSubCart(item)}
                  >
                    Add to Cart
                  </button>
                )}

                {mode === "admin" && (
                  <>
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit?.(item)}
                    >
                      EDIT
                    </button>

                    <button
                      className="btn-delete"
                      onClick={() => handleDelete?.(item.id)}
                    >
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