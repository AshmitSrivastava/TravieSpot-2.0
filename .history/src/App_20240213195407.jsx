import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./Home";
import Header from "./Header";
import Footer from "./Footer";
import Demo from "./Demo";
const App = () => {
  return (
    <>

      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/demo" element={<Demo />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
};

export default App;
