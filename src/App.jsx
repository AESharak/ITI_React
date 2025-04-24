import { useState } from "react";
import "./App.css";
import Cart from "./components/Cart";
import Reset from "./components/Reset";
import Header from "./components/Header";
import CartPage from "./pages/CartPage";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import AboutCompany from "./pages/AboutCompany";
import AboutMe from "./pages/AboutMe";

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
    <BrowserRouter>
      <Header count={items.length} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/cart"
          element={
            <CartPage
              items={items}
              handleDecrement={handleDecrement}
              handleIncrement={handleIncrement}
              handleDelete={handleDelete}
              handleReset={handleReset}
            />
          }
        />
        <Route path="/about" element={<About />}>
          <Route path="company" element={<AboutCompany />} />
          <Route path="me" element={<AboutMe />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
