import { useEffect, useMemo, useState } from "react";
import API_URL from "../../services/apiConfig";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

const defaultStats = {
  total_revenue: 0,
  total_orders: 0,
  total_products: 0,
  total_customers: 0,
  revenue_by_days: [],
  recent_orders: [],
  best_selling_products: [],
};

function Dashboard() {
  const [stats, setStats] = useState(defaultStats);
  const [loading, setLoading] = useState(false);

  const getDashboardStats = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/admin/dashboard`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Không lấy được dữ liệu dashboard");
        return;
      }

      setStats({
        ...defaultStats,
        ...result.data,
      });
    } catch (error) {
      console.log(error);
      alert("Lỗi kết nối server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardStats();
  }, []);

  const chartData = useMemo(() => {
    return {
      labels: stats.revenue_by_days.map((item) => item.date),
      datasets: [
        {
          label: "Doanh thu",
          data: stats.revenue_by_days.map((item) => Number(item.total)),
          borderColor: "#c57b39",
          backgroundColor: "#c57b39",
          tension: 0.4,
        },
      ],
    };
  }, [stats.revenue_by_days]);

  return (
    <section className="admin-page">
      <div className="admin-section-title">
        <h1 style={{ color: "red" }}>Dashboard</h1>
        <p style={{ marginBottom: "20px" }}>
          Tổng quan hoạt động kinh doanh của ChunChun Coffee
        </p>
      </div>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <>
          <div className="dashboard-grid">
            <DashboardCard
              title="Tổng doanh thu"
              value={`${Number(stats.total_revenue).toLocaleString()}đ`}
            />

            <DashboardCard title="Tổng đơn hàng" value={stats.total_orders} />

            <DashboardCard title="Tổng sản phẩm" value={stats.total_products} />

            <DashboardCard
              title="Tổng khách hàng"
              value={stats.total_customers}
            />
          </div>

          <div className="dashboard-chart">
            <h2>Doanh thu theo ngày</h2>

            {stats.revenue_by_days.length > 0 ? (
              <Line data={chartData} />
            ) : (
              <p>Chưa có dữ liệu doanh thu</p>
            )}
          </div>
      <RecentOrders orders={stats.recent_orders} />

          <div className="best-selling-box">
            <h2>Sản phẩm bán chạy</h2>

            {stats.best_selling_products.length > 0 ? (
              <table className="best-selling-table">
                <thead>
       
                  <tr>
                    <th>Sản phẩm</th>
                    <th>Đã bán</th>
                  </tr>
                </thead>

                <tbody>
                  {stats.best_selling_products.map((item) => (
                    <tr key={item.product_id}>
                      <td>{item.product?.name}</td>
                      <td>{item.total_sold}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Chưa có dữ liệu</p>
            )}
          </div>
        </>
      )}
    </section>
  );
}

function DashboardCard({ title, value }) {
  return (
    <div className="dashboard-card">
      <p>{title}</p>
      <h2>{value}</h2>
    </div>
  );
}

function RecentOrders({ orders }) {
  return (
    <div className="recent-orders-box">
      <h2>Đơn hàng mới nhất</h2>

      {orders.length > 0 ? (
        <table className="recent-orders-table">
          <thead>
            <tr>
              <th>Mã đơn</th>
              <th>Khách hàng</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.customer_name}</td>
                <td>{Number(order.total_price).toLocaleString()}VNĐ</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Chưa có đơn hàng mới</p>
      )}
    </div>
  );
}

export default Dashboard;
