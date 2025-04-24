import { useState } from "react";
import "./App.css";
import Cart from "./components/Cart";
import Reset from "./components/Reset";
import Header from "./components/Header";

function App() {
  const [items, setItems] = useState([
    { id: 1, name: "Burger", count: 0 },
    { id: 2, name: "shrimps", count: 0 },
    { id: 3, name: "meat", count: 0 },
  ]);

  function handleIncrement(id) {
    const newItem = items.map((itm) =>
      itm.id === id ? { ...itm, count: itm.count + 1 } : itm
    );
    setItems(newItem);
  }
  function handleDecrement(id) {
    const newItem = items.map((itm) =>
      itm.id === id ? { ...itm, count: itm.count - 1 } : itm
    );
    setItems(newItem);
  }

  function handleReset() {
    const newItem = items.map((itm) => ({ ...itm, count: 0 }));
    setItems(newItem);
  }

  function handleDelete(id) {
    const newItemsAfterDeletion = items.filter((itm) => itm.id !== id);
    setItems(newItemsAfterDeletion);
  }

  return (
    <div className="container">
      <Header count={items.length} />
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
    </div>
  );
}

export default App;
