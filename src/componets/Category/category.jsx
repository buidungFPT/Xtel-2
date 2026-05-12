// function Category({ category, setCategory }) {
//     return (
//           <select value={category} onChange={(e) => setCategory(e.target.value)}>
//         <option value="all">Tất cả</option>
//         <option value="Trà sữa">Trà sữa</option>
//         <option value="Cà phê">Cà phê</option>
//       </select>
//     )
// }
// export default Category;

function Category({ category, setCategory, categoriesForm = [] }) {
  return (
    <select
      className="filter-select"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
    >
      <option value="all">Tất cả</option>

      {categoriesForm.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </select>
  );
}

export default Category;