import CartItem from "../components/CartItem";

function CartPage({ cartItems, onToggleInCart }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={() => onToggleInCart(item.id)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
