const API_URL = "http://localhost:8000/api";

////////CATEGORIES API////////
 const getCategories = async () => {
    const response = await fetch(`${API_URL}/categories`);
    return response.json();
};

 const createCategory = async (data) => {
    const res = await fetch(`${API_URL}/categories`, {
        method: 'POST',
        headers: {
           "Content-Type": "application/json",
      Accept: "application/json",
        },
        body: JSON.stringify(data)
    });
    return res.json();
};

 const updateCategory = async (id, data) => {
    const res = await fetch(`${API_URL}/categories/${id}`, {
        method: 'PUT',
        headers: {
           "Content-Type": "application/json",
      Accept: "application/json",
        },
        body: JSON.stringify(data)
    });
    return res.json();
};

 const deleteCategory = async (id) => {
    const res = await fetch(`${API_URL}/categories/${id}`, {
        method: 'DELETE'
    });
    return res.json();
};


////////PRODUCTS API////////

 const getProducts = async () => {
    const response = await fetch(`${API_URL}/products`);
    return response.json();
};

 const createProduct = async (data) =>{
    const res = await fetch(`${API_URL}/products`,{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'   

        },
        body: JSON.stringify(data)
    });
    return res.json();
}

 const updateProduct = async (id, data) => {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

 const deleteProduct = async (id) => {
    const res = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE'
    });
    return res.json();
};


///////Orders API////////

 const createOrder = async (data) => {
    const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: "application/json",
        },
        body: JSON.stringify(data),
    });
    return res.json();
};

 const getOrders = async () => {
  const res = await fetch(`${API_URL}/orders`, {
    headers: {
      Accept: "application/json",
    },
  });

  return res.json();
};

 const updateOrderStatus = async (id, data) => {
    const res = await fetch(`${API_URL}/orders/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Accept: "application/json",
        },
        body: JSON.stringify(data),
    });
    return res.json();
};

 const deleteOrder= async (id) => {
    const res = await fetch(`${API_URL}/orders/${id}`, {
        method: 'DELETE'
    });
    return res.json();
};
 const handleLogout = async () => {
  const token = localStorage.getItem("token");

  try {
    await fetch("http://127.0.0.1:8000/api/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  } catch (error) {
    console.log(error);
  }


  


};
export {
//   API_URL,
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
 
};
// export default API_URL;
export const getDataArray = (result) => {
  if (Array.isArray(result)) return result;

  if (Array.isArray(result?.data)) {
    return result.data;
  }

  if (Array.isArray(result?.products)) {
    return result.products;
  }

  if (Array.isArray(result?.categories)) {
    return result.categories;
  }

  if (Array.isArray(result?.orders)) {
    return result.orders;
  }

  return [];
};

