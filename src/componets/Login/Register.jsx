import { useState } from "react";
import API_URL from "../../services/apiConfig";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (form.password.length < 6) {
      alert("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    if (form.password !== form.password_confirmation) {
      alert("Mật khẩu nhập lại không khớp");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Đăng ký thất bại");
        console.log("Register errors:", data.errors || data);
        return;
      }

      alert("Đăng ký thành công, vui lòng đăng nhập");
      window.location.href = "/login";
    } catch (error) {
      console.error("Register error:", error);
      alert("Không thể kết nối tới server");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="auth-page">
    <form className="auth-form" onSubmit={handleRegister}>
      <h2>Đăng ký</h2>

      <p>Tạo tài khoản để đặt đồ uống nhanh hơn ☕</p>

      <input
        name="name"
        placeholder="Tên người dùng"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        name="password"
        type="password"
        placeholder="Mật khẩu"
        value={form.password}
        onChange={handleChange}
      />

      <input
        name="password_confirmation"
        type="password"
        placeholder="Nhập lại mật khẩu"
        value={form.password_confirmation}
        onChange={handleChange}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Đang đăng ký..." : "Đăng ký"}
      </button>

      <div className="auth-extra">
        Đã có tài khoản? <a href="/login">Đăng nhập</a>
      </div>
    </form>
  </div>
);
}

export default Register;
