import { updateOrderStatus } from "../../services/api";

function OrderTable({ orders, fetchOrders }) {

  const handleChangeStatus = async (id, status) => {
    try {

      await updateOrderStatus(id, {
        status,
      });

      fetchOrders();

    } catch (error) {
      console.log(error);
      alert("Không thể cập nhật trạng thái");
    }
  };

  const handleChangePaymentMethod = async (
  id,
  payment_method
) => {
  try {

    await updateOrderStatus(id, {
      payment_method,
    });

    fetchOrders();

  } catch (error) {
    console.log(error);
    alert("Không thể cập nhật phương thức thanh toán");
  }
};

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "status-pending";

      case "processing":
        return "status-processing";

      case "shipping":
        return "status-shipping";

      case "completed":
        return "status-completed";

      case "cancelled":
        return "status-cancelled";

      default:
        return "";
    }
  };

  return (
    <div className="order-section">

      <div className="table-header">
        
        <p>
          THEO DÕI TRẠNG THÁI ĐƠN HÀNG
        </p>
      </div>

      <div className="order-table">

        <div className="order-header">
          <span>Mã đơn</span>
          <span>Khách hàng</span>
          <span>SĐT</span>
          <span>Số lượng</span>
          <span>Tổng tiền</span>
          <span>Trạng thái</span>
          <span>Ngày đặt</span>
          <span>Thanh toán</span>
        </div>

        {orders.map((item) => (

          <div
            className="order-row"
            key={item.id}
          >

            <span>#{item.id}</span>

            <span className="customer-name">
              {item.customer_name}
            </span>

            <span>{item.phone}</span>

            <span>
              {
                item.order_details?.reduce(
                  (total, detail) =>
                    total + detail.quantity,
                  0
                )
              }
            </span>

            <span className="order-price">
              {Number(
                item.total_price
              ).toLocaleString()}đ
            </span>

            <span>

              <select
                className={`status-select ${getStatusClass(item.status)}`}
                value={item.status}
                onChange={(e) =>
                  handleChangeStatus(
                    item.id,
                    e.target.value
                  )
                }
              >

                <option value="pending">
                  Chờ xử lý
                </option>

                <option value="processing">
                  Đang pha chế
                </option>

                <option value="shipping">
                  Đang giao
                </option>

                <option value="completed">
                  Hoàn thành
                </option>

                <option value="cancelled">
                  Đã hủy
                </option>

              </select>

            </span>

            <span>
              {
                new Date(
                  item.created_at
                ).toLocaleDateString()
              }
            </span>
     <span>

  <select
    className="payment-method-select"
    value={item.payment?.method || "cod"}
    onChange={(e) =>
      handleChangePaymentMethod(
        item.id,
        e.target.value
      )
    }
  >

    <option value="cod">
      COD
    </option>

    <option value="banking">
      Chuyển khoản
    </option>

    <option value="momo">
      MOMO
    </option>

    <option value="vnpay">
      VNPAY
    </option>

  </select>

</span>
              

          </div>

        ))}

      </div>

    </div>
  );
}

export default OrderTable;