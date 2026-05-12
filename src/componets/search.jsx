// function Search({ search, setSearch }) {
//     return(
//         <input
//         type="text"
//         placeholder="Tìm sản phẩm..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />
//     )
// }
// export default Search;
function Search({ search, setSearch }) {
  return (
    <input
      className="search-input"
      type="text"
      placeholder="Tìm sản phẩm..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

export default Search;