import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./Home";
import Header from "./Header";
import Footer from "./Footer";
import Places from "./Places";
import Random from "./Random";


const App = () => {
  return (
    <>

      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/places" element= {<Places/>} />
          <Route path="/random" element= {<Random/>} />
         
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
};

export default App;
