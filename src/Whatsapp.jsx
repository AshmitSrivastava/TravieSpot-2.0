import React from 'react';
import whatsapp from './assets/Images/whatsapp.png';
import logo from './assets/Images/Logo.png';

const Whatsapp = () => {
  return (
    <>
      <div className="logo fixed top-1/2 bg-[rgba(0,0,0,0.8)] rounded-3xl right-0">
        <a href="https://api.whatsapp.com/send/?phone=8169349915&text=Hey there, how can we help you uwu (^-^)">
          <img src={whatsapp} alt="Whatsapp" />
        </a>
      </div>
    </>
  );
};

export default Whatsapp;
