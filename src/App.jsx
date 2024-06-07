// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Form } from "react-router-dom";
import Home from "./Home/Home";
import Header from "./Header";
import Footer from "./Footer";
import Places from "./FooterStuff/Places/Places";
import Random from "./FooterStuff/Random/Random";
import Shop from "./HeaderStuff/Shopping/Shop";
import ShopCart from "./HeaderStuff/Shopping/ShopCart";
import { CartProvider } from "react-use-cart";
import AboutUs from "./HeaderStuff/About/AboutUs";
import Certificate from "./FooterStuff/Certificate/Certificate";
import KnowAbout from "./FooterStuff/CityDetails/KnowAbout";
import CityDetail from "./FooterStuff/CityDetails/CityDetail";
import UForm from "./HeaderStuff/ContactUs/UForm";
import Whatsapp from "./Whatsapp";
import Services from "./HeaderStuff/services/Services";
import Login from "./HeaderStuff/Login/Login";
import SignUp from "./HeaderStuff/Login/SignUp";
import Chatbox from "./Chatbox/Chatbox";
import ReviewForm from "./FooterStuff/ReviewForm/ReviewForm";
import Flights from "./FooterStuff/Flights/Flights";
import Trains from "./FooterStuff/Trains/Trains";
import Bye from "./HeaderStuff/Login/Bye";
import Faq from "./FooterStuff/Faq";
import Green from "./FooterStuff/Green/Green";

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
            <Route path="/about" element={<AboutUs />} />
            <Route path="/flights" element={<Flights />} />
            <Route path="/certificate" element={<Certificate />} />
            <Route path="/know" element={<KnowAbout />} />
            <Route path="/know/:id" element={<CityDetail />} />
            <Route path="/uform" element={<UForm />} />
            <Route path="/services" element={<Services />} />
            <Route path="/uform" element={<UForm />} />
            <Route path="/services" element={<Services />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/review" element={<ReviewForm />} />
            <Route path="/bye" element={<Bye />} />
            <Route path="/trains" element={<Trains />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/green" element={<Green />} />
          </Routes>
        </CartProvider>
      </BrowserRouter>
      <Footer />
      <Whatsapp />
      <Chatbox />
    </>
  );
};

export default App;
