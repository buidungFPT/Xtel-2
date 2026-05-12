// function    SortPrice({ sortPrice, setSortPrice }) {
//     return (
//         <select value={sortPrice} onChange={(e) => setSortPrice(e.target.value)}>
//           <option value="default">Mặc định</option>
//           <option value="asc">Giá tăng dần</option>
//           <option value="desc">Giá giảm dần</option>
//         </select>
//     )
// }   
// export default SortPrice; 
function SortPrice({ sortPrice, setSortPrice }) {
  return (
    <select
      className="filter-select"
      value={sortPrice}
      onChange={(e) => setSortPrice(e.target.value)}
    >
      <option value="default">Mặc định</option>
      <option value="asc">Giá tăng dần</option>
      <option value="desc">Giá giảm dần</option>
    </select>
  );
}

export default SortPrice;