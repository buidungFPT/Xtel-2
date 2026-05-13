import ProductItem from "../../componets/ProductItem";
import Cart from "../../componets/cart";
import Search from "../../componets/search";
import SortPrice from "../../componets/sortPrice";
import CheckoutForm from "../../componets/Order/CheckOutform";
import Category from "../../componets/Category/category";

function MenuSection({
  category,
  setCategory,
  categoriesForm,
  search,
  setSearch,
  sortPrice,
  setSortPrice,
  filterProducts,
 handleSubCart,
  cart,
  totalMoney,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
  handleRemoveCart,
  handleSubmitOrder,
}) {
  return (
    <section className="section menu-section" id="menu">
      <div className="section-title">
        <h2>Sản phẩm nổi bật</h2>
        <p>Những món được khách hàng yêu thích nhất</p>
      </div>

      <div className="category-tabs">
        <Category
          category={category}
          setCategory={setCategory}
          categoriesForm={categoriesForm}
        />
      </div>

      <div className="menu-tools">
        <Search search={search} setSearch={setSearch} />
        <SortPrice sortPrice={sortPrice} setSortPrice={setSortPrice} />
      </div>

      <div className="user-menu-layout">
        <ProductItem
          mode="user"
          filterProducts={filterProducts}
          handleSubCart={handleSubCart}
        />

        <Cart
          cart={cart}
          totalMoney={totalMoney}
          handleIncreaseQuantity={handleIncreaseQuantity}
          handleDecreaseQuantity={handleDecreaseQuantity}
          handleRemoveCart={handleRemoveCart}
        />

        <CheckoutForm cart={cart} onSubmitOrder={handleSubmitOrder} />
      </div>
    </section>
  );
}

export default MenuSection;