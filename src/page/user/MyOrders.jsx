import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../../services/apiConfig";

function MyOrder() {
  const [order, setOrder] = useState([]);

  const getMyOrder = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/my-order`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    setOrder(data.data || []);
  };

  useEffect(() => {
    getMyOrder();
  }, []);

  return (
    <section className="my-orders-page">
      <h2>Đơn hàng của tôi</h2>

      <div className="my-order-actions">
        <Link to="/user" className="back-home-btn">
          ← Quay lại trang chủ
        </Link>
      </div>

      {order.length === 0 ? (
        <p>Bạn chưa có đơn hàng nào</p>
      ) : (
        order.map((order) => (
          <div className="my-order-card" key={order.id}>
            <h3>Đơn #{order.id}</h3>

            <p>Khách hàng: {order.customer_name}</p>

            <p>SĐT: {order.phone}</p>

            <p>Trạng thái: {order.status}</p>

            <p>
              Tổng tiền:
              {Number(order.total_price).toLocaleString()}đ
            </p>

            <h4>Sản phẩm</h4>

            {order.order_details?.map((detail) => (
              <p key={detail.id}>
                {detail.product?.name} x {detail.quantity}
              </p>
            ))}
          </div>
        ))
      )}
    </section>
  );
}

export default MyOrder;