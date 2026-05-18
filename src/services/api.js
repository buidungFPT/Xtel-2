import { data } from "react-router-dom";

const API_URL = "http://localhost:8000/api";

const getToken = () => localStorage.getItem("token");

const authHeaders = () => ({
  Accept: "application/json",
  Authorization: `Bearer ${getToken()}`,
});

const jsonHeaders = () => ({
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${getToken()}`,
});

const handleResponse = async (res, defaultMessage = "Có lỗi xảy ra") => {
  const result = await res.json();

  if (!res.ok) {
    console.log(result);
    throw new Error(result.message || defaultMessage);
  }

  return result;
};

/* =========================
   CATEGORIES API
========================= */

const getCategories = async () => {
  try {
    const res = await fetch(`${API_URL}/categories`, {
      headers: {
        Accept: "application/json",
      },
    });

    const data = await handleResponse(res, "Không thể tải danh mục");

    return data;
  } catch (error) {
    console.log("Không thể tải danh mục:", error);

    throw error;
  }
};

const createCategory = async (data) => {
  try {
    const res = await fetch(`${API_URL}/categories`, {
      method: "POST",
      headers: jsonHeaders(),
      body: JSON.stringify(data),
    });
    const data = await handleResponse(res, "Thêm Sản Phẩm Thất Bại ");
    return data;
  } catch (error) {
    console.log("Lỗi Khi Thêm Sản Phẩm ", error);
    throw error;
  }
};
const updateCategory = async (id, data) => {
  try {

    const res = await fetch(`${API_URL}/categories/${id}`, {
      method: "PUT",
      headers: jsonHeaders(),
      body: JSON.stringify(data),
    });

    const result = await handleResponse(
      res,
      "Cập nhật danh mục thất bại"
    );

    return result;

  } catch (error) {

    console.log(
      "Lỗi update danh mục",
      error
    );

    throw error;
  }
};

const deleteCategory = async (id) => {
  try {
    const res = await fetch(`${API_URL}/categories/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    const data = await handleResponse(res, " Xoa Danh Muc That Bai");
    return data;
  } catch (error) {
    console.log("Loi Khi Xoa Danh Muc", error);
    throw data;
  }
};

/* =========================
   PRODUCTS API
========================= */

const getProducts = async () => {
  try {

    const res = await fetch(`${API_URL}/products`, {
      headers: {
        Accept: "application/json",
      },
    });

    const result = await handleResponse(
      res,
      "Không thể tải sản phẩm"
    );

    return result;

  } catch (error) {

    console.log(
      "Lỗi hiện danh sách sản phẩm",
      error
    );

    throw error;
  }
};

const createProduct = async (data) => {
  try {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("quantity", data.quantity);
    formData.append("category_id", data.category_id);
    formData.append("description", data.description || "");

    if (data.image instanceof File) {
      formData.append("image", data.image);
    }

    const res = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: authHeaders(),
      body: formData,
    });

    const result = await handleResponse(res, "Thêm sản phẩm thất bại");

    return result;
  } catch (error) {
    console.log("Lỗi create product:", error);

    throw error;
  }
};

const updateProduct = async (id, data) => {
  try {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("quantity", data.quantity);
    formData.append("category_id", data.category_id);
    formData.append("description", data.description || "");
    formData.append("_method", "PUT");

    if (data.image instanceof File) {
      formData.append("image", data.image);
    }

    const res = await fetch(`${API_URL}/products/${id}`, {
      method: "POST",
      headers: authHeaders(),
      body: formData,
    });

    const result = await handleResponse(res, "Cập nhật sản phẩm thất bại");
    return result;
  } catch (error) {
    console.log("Lỗi Cập Nhật Sản Phẩm ");
    throw error;
  }
};

const deleteProduct = async (id) => {
  try {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });

    const data = await handleResponse(res, "Xóa sản phẩm thất bại");

    return data;
  } catch (error) {
    console.log("Lỗi khi xóa sản phẩm:", error);

    throw error;
  }
};
/* =========================
   ORDERS API
========================= */

const createOrder = async (data) => {
  try {
    const token = localStorage.getItem("token");

    console.log("TOKEN:", token);

    const res = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await handleResponse(res, "Đặt hàng thất bại");

    return result;
  } catch (error) {
    console.log("Lỗi khi đặt hàng:", error);

    throw error;
  }
};

const getOrders = async () => {
  try {

    const res = await fetch(`${API_URL}/orders`, {
      headers: authHeaders(),
    });

    const result = await handleResponse(
      res,
      "Không thể tải đơn hàng"
    );

    return result;

  } catch (error) {

    console.log(
      "Lỗi khi hiển thị đơn hàng",
      error
    );

    throw error;
  }
};
const updateOrderStatus = async (id, data) => {
  try {
    const token = localStorage.getItem("token");

    console.log("TOKEN:", token);

    const res = await fetch(`${API_URL}/orders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await handleResponse(res, "Không thể cập nhật đơn hàng");

    return result;
  } catch (error) {
    console.log("Lỗi update order:", error);

    throw error;
  }
};

const deleteOrder = async (id) => {
  try {

    const res = await fetch(`${API_URL}/orders/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });

    const result = await handleResponse(
      res,
      "Xóa đơn hàng thất bại"
    );

    return result;

  } catch (error) {

    console.log(
      "Lỗi delete order",
      error
    );

    throw error;
  }
};
/* =========================
   AUTH API
========================= */

const handleLogout = async () => {
  const token = getToken();

  try {
    await fetch(`${API_URL}/logout`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }

  localStorage.removeItem("token");
  localStorage.removeItem("user");

  window.location.href = "/login";
};
const getUsers = async () => {
  try {

    const res = await fetch(`${API_URL}/users`, {
      headers: authHeaders(),
    });

    const result = await handleResponse(
      res,
      "Lỗi tải thông tin người dùng"
    );

    return result;

  } catch (error) {

    console.log(
      "Lỗi hiện thông tin người dùng",
      error
    );

    throw error;
  }
};

const createUser = async (data) => {
  try {

    const res = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: jsonHeaders(),
      body: JSON.stringify(data),
    });

    const result = await handleResponse(
      res,
      "Thêm người dùng thất bại"
    );

    return result;

  } catch (error) {

    console.log("Lỗi create user:", error);

    throw error;
  }
};


const updateUser = async (id, data) => {
  try {

    const res = await fetch(`${API_URL}/users/${id}`, {
      method: "PUT",
      headers: jsonHeaders(),
      body: JSON.stringify(data),
    });

    const result = await handleResponse(
      res,
      "Cập nhật người dùng thất bại"
    );

    return result;

  } catch (error) {

    console.log(
      "Lỗi update user:",
      error
    );

    throw error;
  }
};
const deleteUser = async (id) => {
  try {

    const res = await fetch(`${API_URL}/users/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });

    const result = await handleResponse(
      res,
      "Xóa người dùng thất bại"
    );

    return result;

  } catch (error) {

    console.log("Lỗi delete user:", error);

    throw error;
  }
};

/* =========================
   HELPER
========================= */

const getDataArray = (result) => {
  if (Array.isArray(result)) return result;
  if (Array.isArray(result?.data)) return result.data;
  if (Array.isArray(result?.products)) return result.products;
  if (Array.isArray(result?.categories)) return result.categories;
  if (Array.isArray(result?.orders)) return result.orders;

  return [];
};

export {
  API_URL,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  createOrder,
  getOrders,
  updateOrderStatus,
  deleteOrder,
  handleLogout,
  getDataArray,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
