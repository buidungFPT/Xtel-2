import { useCallback, useEffect, useState } from "react";
import OrderTable from "../../componets/Order/OrderTable";
import {
  getOrders,
  createOrder,
  updateOrderStatus,
  deleteOrder,
  getDataArray
} from "../../services/api";

function OrderManage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getOrders();
      setOrders(getDataArray(result));
    } catch (error) {
      console.log(error);
      alert(error.message || "Không thể tải đơn hàng");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <section className="admin-page">
      <div className="admin-section-title">
        
        <p>Theo dõi và cập nhật trạng thái đơn hàng.</p>
      </div>

      {loading ? (
        <p>Đang tải đơn hàng...</p>
      ) : (
        <OrderTable orders={orders} fetchOrders={fetchOrders} />
      )}
    </section>
  );
}

export default OrderManage;
