import { useState } from "react";

function CheckoutForm({ cart, onSubmitOrder }) {
  const [customer, setCustomer] = useState({
    customer_name: "",
    phone: "",
    address: "",
     payment_method: "cod",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!customer.customer_name.trim()) {
      alert("Vui lòng nhập họ tên");
      return;
    }

    if (!customer.phone.trim()) {
      alert("Vui lòng nhập số điện thoại");
      return;
    }

    if (cart.length === 0) {
      alert("Giỏ hàng đang trống");
      return;
    }

    onSubmitOrder(customer);
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <h2>Thông tin đặt hàng</h2>

      <input
        type="text"
        placeholder="Họ tên"
        value={customer.customer_name}
        onChange={(e) =>
          setCustomer({
            ...customer,
            customer_name: e.target.value,
          })
        }
      />

      <input
        type="text"
        placeholder="Số điện thoại"
        value={customer.phone}
        onChange={(e) =>
          setCustomer({
            ...customer,
            phone: e.target.value,
          })
        }
      />

      <input
        type="text"
        placeholder="Địa chỉ"
        value={customer.address}
        onChange={(e) =>
          setCustomer({
            ...customer,
            address: e.target.value,
          })
        }
      />
<div className="payment-methods">

  <button
    type="button"
    className={
      customer.payment_method === "cod"
        ? "payment-btn active"
        : "payment-btn"
    }
    onClick={() =>
      setCustomer({
        ...customer,
        payment_method: "cod",
      })
    }
  >
    💵 Tiền mặt
  </button>

  <button
    type="button"
    value="banking"
    className={
      customer.payment_method === "bank"
        ? "payment-btn active"
        : "payment-btn"
    }
    onClick={() =>
      setCustomer({
        ...customer,
        payment_method: "bank",
      })
    }
  >
    🏦 Chuyển khoản
  </button>

</div>

{customer.payment_method === "bank" && (
  <div className="bank-info-box">

    <h3>Thông tin chuyển khoản</h3>

    <p>Ngân hàng: MB Bank</p>

    <p>Số tài khoản: 0123456789</p>

    <p>Chủ tài khoản: CHUNCHUN COFFEE</p>

    <p>Nội dung: Thanh toán đơn hàng</p>

  </div>
)}
    <button type="submit" className="checkout-btn">
  Xác nhận đặt hàng
</button>
    </form>
  );
}

export default CheckoutForm;