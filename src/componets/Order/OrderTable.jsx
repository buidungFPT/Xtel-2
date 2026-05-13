import { updateOrderStatus, getDataArray } from "../../services/api";

// import {update } from "../services/api";

function OrderTable({ orders, fetchOrders }) {
  const handleChangeStatus = async (id, status) => {
    try {
      await updateOrderStatus(id, {
        status,
      });
      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" admin-car order-section">
      <div className="table-header">
        <div>
          <h1 style={{color:"red"}}> QUẢN LÝ ĐƠN HÀNG </h1>
          <p style={{marginBottom:"30px"}}>THEO DOI TRẠNG THÁI ĐƠN HÀNG</p>
        </div>
      </div>
      <div className="order-table">
        <div className="order-now order-header">
          <span>Mã đơn</span>
          <span>Khách hàng</span>
          <span>SĐT</span>
          <span>Số lượng</span>
          <span>Tổng tiền</span>
          <span>Trạng thái</span>
          <span>Ngày đặt</span>
        </div>
      </div>

      {orders.map((item) => (
        <div className="order-row" key={item.id}>
          <span>{item.id}</span>
          <span>{item.customer_name}</span>
          <span>{item.phone}</span>
          <span>
  {item.order_details?.reduce(
    (total, detail) => total + detail.quantity,
    0
  )}
</span>
          <span>{Number(item.total_price).toLocaleString()}đ</span>
          <span>
            <select
              value={item.status}
              onChange={(e) => handleChangeStatus(item.id, e.target.value)}
              style={{
                padding: "10px 14px",
                borderRadius: "10px",
                border: "none",
                fontWeight: "700",
                color: "#fff",
                background:
                  item.status === "pending"
                    ? "#f59e0b"
                    : item.status === "processing"
                      ? "#3b82f6"
                      : item.status === "shipping"
                        ? "#8b5cf6"
                        : item.status === "completed"
                          ? "#22c55e"
                          : "#ef4444",
              }}
            >
              <option value="pending">Chờ xử lý</option>

              <option value="processing">Đang pha chế</option>

              <option value="cancelled">Đã hủy</option>

              <option value="completed">Hoàn thành</option>

              <option value="shipping">Đang giao</option>
            </select>
          </span>
          {new Date(item.created_at).toLocaleDateString()}
        </div>
      ))}
    </div>
  );
}

export default OrderTable;
