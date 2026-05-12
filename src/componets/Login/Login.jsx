import { useState } from "react";
import API_URL from "../../services/apiConfig";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      alert("Vui lòng nhập đầy đủ email và mật khẩu");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Đăng nhập thất bại");
        console.log("Login errors:", data.errors || data);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Đăng nhập thành công");

      if (data.user?.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Không thể kết nối tới server");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="auth-page">
    <form className="auth-form" onSubmit={handleLogin}>
      <h2>Đăng nhập</h2>

      <p>Chào mừng quay trở lại ChunChun Coffee ☕</p>

      <input
        name="email"
        type="email"
        placeholder="Nhập email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        name="password"
        type="password"
        placeholder="Nhập mật khẩu"
        value={form.password}
        onChange={handleChange}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
      </button>

      <div className="auth-extra">
        Chưa có tài khoản? <a href="/register">Đăng ký ngay</a>
      </div>
    </form>
  </div>
);
}

export default Login;
