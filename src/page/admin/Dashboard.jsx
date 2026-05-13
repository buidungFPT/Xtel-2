import { useEffect, useState } from "react";
import API_URL from "../../services/apiConfig";

function Dashboard() {
  const [stats, setStats] = useState({
    total_revenue: 0,
    total_orders: 0,
    total_products: 0,
    total_customers: 0,
  });

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

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Không lấy được dữ liệu dashboard");
        return;
      }

      setStats(data.data);
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

  return (
    <section className="admin-page">
      <div className="admin-section-title">
        <h1 style={{color:"black"}}>Dashboard</h1>
       
      </div>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <div className="dashboard-grid" style={{marginTop:"100px"}}>
          <div className="dashboard-card">
            <p>Tổng doanh thu</p>
            <h2>{Number(stats.total_revenue).toLocaleString()}đ</h2>
          </div>

          <div className="dashboard-card">
            <p>Tổng đơn hàng</p>
            <h2>{stats.total_orders}</h2>
          </div>

          <div className="dashboard-card">
            <p>Tổng sản phẩm</p>
            <h2>{stats.total_products}</h2>
          </div>

          <div className="dashboard-card">
            <p>Tổng khách hàng</p>
            <h2>{stats.total_customers}</h2>
          </div>
        </div>
      )}
    </section>
  );
}

export default Dashboard;