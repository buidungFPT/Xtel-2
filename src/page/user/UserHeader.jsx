import { Link } from "react-router-dom";

function UserHeader({ token, user, handleLogout }) {
  return (
    <header className="coffee-header">
      <div className="coffee-logo">ChunChun Coffee</div>

      <nav className="coffee-nav">
        <a href="#home">Trang chủ</a>

        <a href="#menu">Menu</a>

        <a href="#about">Giới thiệu</a>

        <a href="#deals">Ưu đãi</a>

        <a href="#contact">Liên hệ</a>

        {token && user && (
          <Link to="/my-orders">Đơn hàng của tôi</Link>
        )}

        {token && user ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <div
              style={{
                color: "#f6c56b",
                fontWeight: "700",
              }}
            >
              {user.email}
            </div>

            <button
              style={{                padding: "10px 16px",
                borderRadius: "10px",
                background: "#c57b39",
                color: "white",
                fontWeight: "700",
              }}
              onClick={handleLogout}
            >
              Đăng xuất
            </button>
          </div>
        ) : (
          <>
            <Link to="/login">Đăng nhập</Link>

            <Link to="/register">Đăng ký</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default UserHeader;