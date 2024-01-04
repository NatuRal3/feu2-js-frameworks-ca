import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import "./App.css";

import Layout from "./components/Layout.tsx";

//Pages
import Home from "./pages/Home.tsx";
import Product from "./pages/Product.tsx";
import Cart from "./pages/Cart.tsx";
import Checkout from "./pages/Checkout.tsx";
import Contact from "./pages/Contact.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/product/:itemId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
