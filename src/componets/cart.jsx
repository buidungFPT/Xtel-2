// function Cart ({cart,totalMoney,handleIncreaseQuantity,handleDecreaseQuantity,handleRemoveCart}) {
//     return(
//         <div style={{ marginTop: "20px" }} className="Cart01">
//             <h2>Giỏ hàng</h2>

//       {cart.length === 0 ? (
//         <p>Giỏ hàng đang trống</p>
//       ) : (
//         cart.map((item) => (
//           <div key={item.id}>
//             <h3>{item.name}</h3>
//             <p>Giá: {item.price.toLocaleString()}đ</p>
//             <p>Số lượng: {item.quantity}</p>
            
//             <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
//             <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
//             <button onClick={() => handleRemoveCart(item.id)}>Xóa</button>
//             <p>
//               Thành tiền:{" "}
//               {(item.price * item.quantity).toLocaleString()}đ
//             </p>
//           </div>
//         ))
//       )}

//       <h2>Tổng tiền: {totalMoney.toLocaleString()}đ</h2>
//         </div>
//     )
// }
// export default Cart;
function Cart({
  cart,
  totalMoney,
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
        cart.map((item) => (
          <div className="cart-item" key={item.id}>
            <h3>{item.name}</h3>

            <p>Giá: {item.price.toLocaleString()}đ</p>
            <p>Số lượng: {item.quantity}</p>

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
              Thành tiền: {(item.price * item.quantity).toLocaleString()}đ
            </p>
          </div>
        ))
      )}

      <h2 className="total-money">
        Tổng tiền: {totalMoney.toLocaleString()}đ
      </h2>
    </div>
  );
}

export default Cart;