import Cart from "../components/Cart";
import Header from "../components/Header";
import Reset from "../components/Reset";

function CartPage({
  items,
  handleDecrement,
  handleIncrement,
  handleDelete,
  handleReset,
}) {
  return (
    <>
      {items.length === 0 && (
        <h2 className="mt-4">Cart is Empty, Please add to cart</h2>
      )}
      {items.map((item) => (
        <Cart
          id={item.id}
          name={item.name}
          count={item.count}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
          key={item.id}
          handleDelete={handleDelete}
        />
      ))}
      {items.length > 0 && <Reset handleReset={handleReset} />}
    </>
  );
}

export default CartPage;
