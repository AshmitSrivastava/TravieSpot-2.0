import React, { useState , useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
//import Login from "./HeaderStuff/Login/Login";
//import SignUp from "./HeaderStuff/Login/SignUp";
import Chatbox from "./Chatbox/Chatbox";
import ReviewForm from "./FooterStuff/ReviewForm/ReviewForm";
import Flights from "./FooterStuff/Flights/Flights";
// import Trains from "./FooterStuff/Trains/Trains";
import Bye from "./HeaderStuff/Login/Bye";
import Faq from "./FooterStuff/Faq";
import Green from "./FooterStuff/Green/Green";
import WeatherCard from './FooterStuff/WeatherCard/WeatherCard';
import Newsletter from "./FooterStuff/NewsLetter/Newsletter";
import Signup from "./HeaderStuff/Authentication/Signup";
import Login from "./HeaderStuff/Authentication/Login";
import Logout from "./HeaderStuff/Authentication/Logout";
import Vaish from "./FooterStuff/Vaish/Vaish";
<<<<<<< HEAD
import Login1 from "./FooterStuff/Test/Test2";
=======
import Footprint from "./FooterStuff/Footprints/Footprint";
import Posts from "./FooterStuff/Blog/posts";
import CreatePost from "./FooterStuff/Blog/create";
>>>>>>> d7816226b01f92b81409ae0fb58e50dbd9bd955d

const App = () => {

  const [isAuthenticated , setisAuthenticated] = useState(false);

  useEffect (() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/auth/protected', {
          credentials : 'include' 
        });
        if(response.status == 200){
          setisAuthenticated(true);
        }

      }

      catch(err){
        console.error("Error in authentication in App.jsx ", err);
      }
    };
    checkAuth();
  }, []);


  const handleLogin = () => {
    setisAuthenticated(true);
  };

  const handleLogout  = () => {
    setisAuthenticated(false);
  }


  return (
    <>
      <BrowserRouter>
        <Header>
        </Header>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/places" element={<Places />} />
            <Route path="/random" element={<Random/>} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<ShopCart />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/flights" element={<Flights />} />
            <Route path="/certificate" element={<Certificate />} />
            <Route path="/know" element={<KnowAbout />} />
            <Route path="/know/:id" element={<CityDetail />} />
            <Route path="/uform" element={<UForm />} />
            <Route path="/services" element={<Services />} />
            {/* <Route path="/login" element={<Login />} /> */}
            {/* <Route path="/signup" element={<SignUp />} /> */}
            <Route path="/review" element={<ReviewForm />} />
            <Route path="/bye" element={<Bye />} />
            <Route path="/WeatherCard" element={<WeatherCard />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/green" element={<Green />} />
            <Route path="/newsletter" element={<Newsletter /> }/>
            <Route path="/login" element = {<Login onLogin={handleLogin}/>}/>
            <Route path="/signup" element = {<Signup/>}/>
            <Route path="/logout" element = {<Logout onLogout={handleLogout}/>}/>
            <Route path="/vaish" element={<Vaish/>}/>
<<<<<<< HEAD
            <Route path="/login1" element={<Login1/>}/>
=======
            <Route path="/footprint" element={<Footprint/>}/>
            <Route path="/posts" element={<Posts/>}/>
            <Route path="/create" element={<CreatePost/>}/>
>>>>>>> d7816226b01f92b81409ae0fb58e50dbd9bd955d
          </Routes>
        </CartProvider>
      <Footer />
      </BrowserRouter>
      <Whatsapp />
      <Chatbox />
    </>
  );
};

export default App;
