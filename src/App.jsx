import { useEffect, useState } from "react";
import "./App.css";

import Header from "./components/Header";
import CartPage from "./pages/CartPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import AboutCompany from "./pages/AboutCompany";
import AboutMe from "./pages/AboutMe";
import GameLab from "./pages/GameLab";
import CreateProduct from "./pages/CreateProduct";
import axios from "axios";
import Menu from "./pages/Menu";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  function handleAddToCart(id) {
    const itemIdx = cartItems.findIndex((itm) => itm.id === id);
    if (itemIdx === -1) {
      const item = items.find((item) => item.id === id);
      if (item) {
        setCartItems((citms) => [...citms, item]);
      }
    }
  }

  function handleRemoveFromCart(id) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
  }

  function handleToggleInCart(id) {
    const isInCart = cartItems.some((item) => item.id === id);

    if (isInCart) {
      setCartItems((currentItems) =>
        currentItems.filter((item) => item.id !== id)
      );
    } else {
      const item = items.find((item) => item.id === id);
      if (item) {
        setCartItems((citms) => [...citms, item]);
      }
    }
  }

  function isItemInCart(id) {
    return cartItems.some((item) => item.id === id);
  }

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("http://localhost:3000/products");
      setItems(data);
    };

    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <Header count={cartItems.length} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/menu"
          element={
            <Menu
              items={items}
              onAddToCart={handleAddToCart}
              onRemoveFromCart={handleRemoveFromCart}
              onToggleInCart={handleToggleInCart}
              isItemInCart={isItemInCart}
            />
          }
        />
        <Route path="/createProduct" element={<CreateProduct />} />
        <Route
          path="/cart"
          element={
            <CartPage
              cartItems={cartItems}
              onRemoveFromCart={handleRemoveFromCart}
              onToggleInCart={handleToggleInCart}
            />
          }
        />
        <Route path="/about" element={<About />}>
          <Route path="company" element={<AboutCompany />} />
          <Route path="me" element={<AboutMe />} />
        </Route>
        <Route path="/game" element={<GameLab />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
