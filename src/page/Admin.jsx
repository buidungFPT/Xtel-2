// import { useEffect, useMemo, useState } from "react";
// import ItemForm from "../componets/Itemfrom";
// import ProductItem from "../componets/ProductItem";
// import Category from "../componets/Category/category";
// import CategoryForm from "../componets/Category/categoryForm";
// import Search from "../componets/search";
// import SortPrice from "../componets/sortPrice";
// import OrderTable from "../componets/Order/OrderTable";
// import { getOrders } from "../services/api";
// import {
//   getProducts,
//   createProduct,
//   updateProduct,
//   deleteProduct,
//   getCategories,
// } from "../services/api";

// function Admin() {
//   const [products, setProducts] = useState([]);
//   const [categoriesForm, setCategoriesForm] = useState([]);

//   const [form, setForm] = useState({
//     name: "",
//     price: "",
//     quantity: "",
//     category_id: "",
//   });

//   const [editId, setEditId] = useState(null);
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("all");
//   const [sortPrice, setSortPrice] = useState("default");
//   const [orders, setOrders] = useState([]);

//   async function fetchData() {
//     try {
//       const productResult = await getProducts();
//       const categoryResult = await getCategories();
//       const orderResult = await getOrders();
//       setOrders(orderResult.data);

//       setProducts(productResult.data);
//       setCategoriesForm(categoryResult.data);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       fetchData();
//     }, 0);

//     return () => clearTimeout(timer);
//   }, []);

//   const resetForm = () => {
//     setForm({
//       name: "",
//       price: "",
//       quantity: "",
//       category_id: "",
//     });

//     setEditId(null);
//   };
//   const handleSubmitForm = async (e) => {
//     e.preventDefault();

//     if (!form.name.trim()) {
//       alert("Tên sản phẩm không được để trống");
//       return;
//     }

//     if (!form.price) {
//       alert("Vui lòng nhập giá sản phẩm");
//       return;
//     }

//     if (!form.category_id) {
//       alert("Vui lòng chọn danh mục");
//       return;
//     }

//     try {
//       const payload = {
//         name: form.name,
//         price: Number(form.price),
//         category_id: Number(form.category_id),
//         quantity: Number(form.quantity),
//       };
//       if (editId !== null) {
//         await updateProduct(editId, payload);
//       } else {
//         await createProduct(payload);
//       }

//       await fetchData();
//       resetForm();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleEdit = (product) => {
//     setEditId(product.id);

//     setForm({
//       name: product.name,
//       price: product.price,
//       quantity: product.quantity,
//       category_id: product.category_id,
//     });
//   };

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm("Bạn có chắc muốn xóa sản phẩm này?");

//     if (!confirmDelete) return;

//     try {
//       await deleteProduct(id);
//       await fetchData();
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const filterProducts = useMemo(() => {
//     let result = products.filter((item) => {
//       const matchSearch = item.name
//         .toLowerCase()
//         .includes(search.toLowerCase());

//       const matchCategory =
//         category === "all" || item.category?.name === category;

//       return matchSearch && matchCategory;
//     });

//     if (sortPrice === "asc") {
//       result = [...result].sort((a, b) => a.price - b.price);
//     }

//     if (sortPrice === "desc") {
//       result = [...result].sort((a, b) => b.price - a.price);
//     }

//     return result;
//   }, [products, search, category, sortPrice]);
//   return (
//     <main className="admin-page">
//       {/* HEADER ADMIN */}
//       <header className="admin-header">
//         <div>
//           <h1>ChunChun Admin</h1>
//         </div>

//         <div className="admin-profile">
//           <span>Admin</span>
//           <div className="admin-avatar">A</div>
//         </div>
//       </header>

//       {/* LAYOUT ADMIN: SIDEBAR + CONTENT */}
//       <div className="admin-main-layout">
//         {/* SIDEBAR / MENU */}
//         <aside className="admin-sidebar">
//           <div className="sidebar-logo">ChunChun Coffee</div>

//           <nav className="sidebar-menu">
//             <a href="#dashboard" className="active">
//               Dashboard
//             </a>
//             <a href="#products">Quản lý sản phẩm</a>
//             <a href="#categories">Quản lý danh mục</a>
//             <a href="#orders">Quản lý đơn hàng</a>
//             <a href="#users">Quản lý người dùng</a>
//             <a href="#settings">Cài đặt</a>
//           </nav>
//         </aside>

//         {/* CONTENT */}
//         <section className="admin-content">
//           <section className="page-header" id="dashboard">
//             <h2>Trang Admin - Quản lý sản phẩm</h2>
//             <p>Quản lý danh mục, thêm sửa xóa sản phẩm và kiểm soát dữ liệu.</p>
//           </section>

//           {/* FILTER / TOOLBAR */}
//           <section className="top-bar">
//             <Search search={search} setSearch={setSearch} />

//             <Category
//               category={category}
//               setCategory={setCategory}
//               categoriesForm={categoriesForm}
//             />

//             <SortPrice sortPrice={sortPrice} setSortPrice={setSortPrice} />
//           </section>

//           {/* FORM + LIST */}
//           <section className="admin-layout">
//             <div id="categories">
//               <CategoryForm
//                 categoriesForm={categoriesForm}
//                 fetchData={fetchData}
//               />
//             </div>

//             <div id="products">
//               <ItemForm
//                 form={form}
//                 setForm={setForm}
//                 handleSubmitForm={handleSubmitForm}
//                 editId={editId}
//                 categoriesForm={categoriesForm}
//               />
//             </div>

//             <ProductItem
//               mode="admin"
//               filterProducts={filterProducts}
//               handleEdit={handleEdit}
//               handleDelete={handleDelete}
//             />

//             <OrderTable 
//             orders={orders} 
//             fetchOrders={fetchData} />
//           </section>
//         </section>
//       </div>

//       {/* FOOTER ADMIN */}
//       <footer className="admin-footer">
//         © 2026 ChunChun Coffee Admin. All rights reserved.
//       </footer>
//     </main>
//   );
// }

// export default Admin;
