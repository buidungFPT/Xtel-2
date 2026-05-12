function Dashboard() {
  return (
    <section className="admin-page">
      <div className="admin-section-title">
       
        <p>Tổng quan hoạt động của ChunChun Coffee</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <p>Tổng doanh thu</p>
          <h2>12.500.000đ</h2>
        </div>

        <div className="dashboard-card">
          <p>Tổng đơn hàng</p>
          <h2>128</h2>
        </div>

        <div className="dashboard-card">
          <p>Tổng sản phẩm</p>
          <h2>24</h2>
        </div>

        <div className="dashboard-card">
          <p>Tổng khách hàng</p>
          <h2>86</h2>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;