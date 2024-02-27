// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Header from "./Header";
import Footer from "./Footer";
import Places from "./Places";
import Random from "./Random";
import Shop from "./Shop";
import ShopCart from "./ShopCart";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <CartProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/places" element={<Places />} />
            <Route path="/random" element={<Random />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<ShopCart />} />
          </Routes>
        </CartProvider>
      </BrowserRouter>
      <Footer />
    </>
  );
};

export default App;
