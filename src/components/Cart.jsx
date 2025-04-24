function Cart({ id, name, count, handleIncrement, handleDecrement }) {
  const btnStyling =
    count === 0
      ? "cursor-pointer bg-red-500 px-1 py-0.5 rounded-lg opacity-50"
      : "cursor-pointer bg-red-500 px-1 py-0.5 rounded-lg";
  return (
    <div className="w-full ">
      <button
        className="cursor-pointer bg-sky-500 px-1 py-0.5 rounded-lg"
        onClick={() => handleIncrement(id)}
      >
        +
      </button>
      <span>{name}</span>
      <button
        className={btnStyling}
        onClick={() => handleDecrement(id)}
        disabled={count === 0}
      >
        -
      </button>
      <span>{count}</span>
    </div>
  );
}

export default Cart;
