import { useEffect, useState } from "react";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getDataArray,
} from "../../services/api";

function UserManage() {
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

const fetchUsers = async () => {
  try {
    const result = await getUsers();

    setUsers(result.data || []);
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  fetchUsers();
}, []);
  useEffect(() => {
    fetchUsers();
  }, []);


  const handleChange = (e) => {
    const {name,value} = e.target;
    setForm((prev)=> ({
      ...prev, 
      [name]:value,
    }));
  };

  const resetForm =() =>{
    setEditId(null);
    setForm({
      name: "",
      email: "",
      password: "",
      role:"user",
    });
  }


  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!form.name.trim() || !form.email.trim()) {
        alert("Vui long nhap ten va email");
        return;
      }
      if(!editId && !form.password.trim()){
        alert("Vui long nhap mat khau");
        return
      }
      if (editId){
        await updateUser(editId,form)
        alert("Cap nhat nguoi dung thanh cong")
      }else{
        await createUser(form)
        alert("Them nguoi dung thanh cong ")
      }
        resetForm();
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  }

  const handleEdit = (user) =>{
    setEditId(user.id);
    setForm ({
      name:user.name || "",
      email:user.email || "",
      password:"",
      role:user.role || "user",
    })
    }

 const handleDelete = async (id) => {
  if (!window.confirm("Bạn có chắc muốn xóa người dùng này?")) {
    return;
  }

  try {
    await deleteUser(id);

    alert("Xóa người dùng thành công");

    fetchUsers();
  } catch (error) {
    console.log(error);

    alert(error.message || "Xóa thất bại");
  }
};
  return (
   <section className="admin-page user-manage-page">
      <div className="admin-section-title">
        <h1>Quản lý người dùng</h1>
        <p>Thêm, sửa, xóa và phân quyền tài khoản.</p>
      </div>

      <div className="user-manage-layout">
        <form className="admin-form" onSubmit={handleEditSubmit}>
          <h2>
  {editId ? "Cập nhật người dùng" : "Thêm người dùng"}
</h2>
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
            placeholder={
              editId ? "Để trống nếu không đổi mật khẩu" : "Mật khẩu"
            }
            value={form.password}
            onChange={handleChange}
          />

          <select name="role" value={form.role} onChange={handleChange}>
            <option value="admin">Admin</option>
            <option value="business">Business</option>
            <option value="user">User</option>
          </select>

          <button type="submit">
            {editId ? "Cập nhật" : "Thêm người dùng"}
          </button>

          {editId && (
            <button type="button" className="cancel-btn" style={{marginTop:"20px",backgroundColor:"red"}} onClick={resetForm}>
              Hủy sửa
            </button>
          )}
        </form>

        <div className="user-table-box">
          <h2>Danh sách người dùng</h2>

          <div className="user-table">
            <div className="user-table-header">
              <span>ID</span>
              <span>Tên</span>
              <span>Email</span>
              <span>Vai trò</span>
              <span>Ngày tạo</span>
              <span>Hành động</span>
            </div>

            {users.length === 0 ? (
              <p className="empty">Chưa có người dùng</p>
            ) : (
              users.map((user) => (
                <div className="user-table-row" key={user.id}>
                  <span>{user.id}</span>
                  <span>{user.name}</span>
                  <span>{user.email}</span>
                  <span>{user.role}</span>
                  <span>
                    {user.created_at
                      ? new Date(user.created_at).toLocaleDateString("vi-VN")
                      : ""}
                  </span>
                  <span className="user-actions">
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(user)}
                    >
                      Sửa
                    </button>

                    <button
                      className="btn-delete" 
                      onClick={() => handleDelete(user.id)}
                    >
                      Xóa
                    </button>
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
  
}

export default UserManage;