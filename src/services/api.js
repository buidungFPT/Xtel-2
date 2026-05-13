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
  const res = await fetch(`${API_URL}/categories`, {
    headers: {
      Accept: "application/json",
    },
  });

  return handleResponse(res, "Không thể tải danh mục");
};

const createCategory = async (data) => {
  const res = await fetch(`${API_URL}/categories`, {
    method: "POST",
    headers: jsonHeaders(),
    body: JSON.stringify(data),
  });

  return handleResponse(res, "Thêm danh mục thất bại");
};

const updateCategory = async (id, data) => {
  const res = await fetch(`${API_URL}/categories/${id}`, {
    method: "PUT",
    headers: jsonHeaders(),
    body: JSON.stringify(data),
  });

  return handleResponse(res, "Cập nhật danh mục thất bại");
};

const deleteCategory = async (id) => {
  const res = await fetch(`${API_URL}/categories/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  return handleResponse(res, "Xóa danh mục thất bại");
};

/* =========================
   PRODUCTS API
========================= */

const getProducts = async () => {
  const res = await fetch(`${API_URL}/products`, {
    headers: {
      Accept: "application/json",
    },
  });

  return handleResponse(res, "Không thể tải sản phẩm");
};

const createProduct = async (data) => {
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

  return handleResponse(res, "Thêm sản phẩm thất bại");
};

const updateProduct = async (id, data) => {
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

  return handleResponse(res, "Cập nhật sản phẩm thất bại");
};

const deleteProduct = async (id) => {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  return handleResponse(res, "Xóa sản phẩm thất bại");
};

/* =========================
   ORDERS API
========================= */

const createOrder = async (data) => {
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

  return handleResponse(res, "Đặt hàng thất bại");
};

const getOrders = async () => {
  const res = await fetch(`${API_URL}/orders`, {
    headers: authHeaders(),
  });

  return handleResponse(res, "Không thể tải đơn hàng");
};

const updateOrderStatus = async (id, data) => {
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

  return handleResponse(res, "Cập nhật trạng thái thất bại");
};
const deleteOrder = async (id) => {
  const res = await fetch(`${API_URL}/orders/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  return handleResponse(res, "Xóa đơn hàng thất bại");
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
};