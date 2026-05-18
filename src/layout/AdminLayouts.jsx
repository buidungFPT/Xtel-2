import { NavLink, Outlet } from "react-router-dom";

function AdminLayout() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <main className="admin-site">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <h2 style={{ marginTop: "20px", marginBottom: "40px" }}>
            ChunChun Coffee Admin
          </h2>
        </div>

        <nav className="admin-menu" style={{ marginBottom: "30px"}}>
          <NavLink to="/admin" end>
            📊 Dashboard
          </NavLink>

          <NavLink to="/admin/products">
            ☕ Quản lý sản phẩm
          </NavLink>

          <NavLink to="/admin/categories">
            📂 Quản lý danh mục
          </NavLink>

          <NavLink to="/admin/orders">
            🛒 Quản lý đơn hàng
          </NavLink>

          <NavLink to="/admin/users">
            👤 Quản lý người dùng
          </NavLink>

          <NavLink to="/admin/settings">
            ⚙️ Cài đặt
          </NavLink>

          <NavLink to="/login">
            🚪 Đăng xuất
          </NavLink>
        </nav>
      </aside>

      <section className="admin-main">
        <header className="admin-header">
          <h2 style={{ color: "black" }}>ChunChun Admin</h2>

          <div className="admin-profile">
            <div
              style={{
                color: "#c57b39",
                fontWeight: "700",
              }}
            >
              {user?.email || "Chưa đăng nhập"}
            </div>

            <div className="admin-avatar">
              {user?.name?.charAt(0).toUpperCase() || "A"}
            </div>
          </div>
        </header>

        <Outlet />

        <footer className="admin-footer">
          © 2026 ChunChun Coffee Admin
        </footer>
      </section>
    </main>
  );
}

export default AdminLayout;