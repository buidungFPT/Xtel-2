function Cart({
  cart = [],
  totalMoney = 0,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
  handleRemoveCart,
}) {
  return (
    <div className="cart-box">
      <h2>Giỏ hàng</h2>

      {cart.length === 0 ? (
        <p className="empty">Giỏ hàng đang trống</p>
      ) : (
        cart.map((item) => {
          const quantity = Number(item.cartQuantity || item.quantity || 1);
          const price = Number(item.price || 0);

          return (
            <div className="cart-item" key={item.id}>
              <h3>{item.name}</h3>

              <p>Giá: {price.toLocaleString()}đ</p>
              <p>Số lượng: {quantity}</p>

              <div className="cart-actions">
                <button
                  className="btn-plus"
                  onClick={() => handleIncreaseQuantity(item.id)}
                >
                  +
                </button>

                <button
                  className="btn-minus"
                  onClick={() => handleDecreaseQuantity(item.id)}
                >
                  -
                </button>

                <button
                  className="btn-remove"
                  onClick={() => handleRemoveCart(item.id)}
                >
                  Xóa
                </button>
              </div>

              <p className="cart-subtotal">
                Thành tiền: {(price * quantity).toLocaleString()}đ
              </p>
            </div>
          );
        })
      )}

      <h2 className="total-money">
        Tổng tiền: {Number(totalMoney || 0).toLocaleString()}đ
      </h2>
    </div>
  );
}

export default Cart;