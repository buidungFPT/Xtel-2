import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import User from "./page/User";

import Dashboard from "./page/admin/Dashboard";
import ProductManage from "./page/admin/ProductManage";
import CategoryManage from "./page/admin/CategoryManage";
import OrderManage from "./page/admin/OrderManage";
import UserManage from "./page/admin/UserManage";
import Setting from "./page/admin/Setting";

import AdminLayout from "./layout/AdminLayouts";
import Login from "./componets/Login/Login";
import Register from "./componets/Login/Register";
import MyOrders from "./page/user/MyOrders";
import "./App.css";

function AdminProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/user" />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/user" />} />

        <Route path="/user" element={<User />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
   <Route path="/my-orders" element={<MyOrders />} />
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductManage />} />
          <Route path="categories" element={<CategoryManage />} />
          <Route path="orders" element={<OrderManage />} />
          <Route path="users" element={<UserManage />} />
          <Route path="settings" element={<Setting />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;