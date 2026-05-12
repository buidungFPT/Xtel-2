import { useState } from "react";

function CheckoutForm({ cart, onSubmitOrder }) {
  const [customer, setCustomer] = useState({
    customer_name: "",
    phone: "",
    address: "",
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

      <button type="submit" className="btn-primary">
        Xác nhận đặt hàng
      </button>
    </form>
  );
}

export default CheckoutForm;