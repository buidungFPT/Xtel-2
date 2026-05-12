import { NavLink, Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <main className="admin-site">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <h2>ChunChun</h2>
          <p>Coffee Admin</p>
        </div>

        <nav className="admin-menu">
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

          <NavLink to="/user">
            🚪 Đăng xuất
          </NavLink>
        </nav>
      </aside>

      <section className="admin-main">
        <header className="admin-header">
          <h2>ChunChun Admin</h2>

          <div className="admin-profile">
            <strong>Admin</strong>
            <div className="admin-avatar">A</div>
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