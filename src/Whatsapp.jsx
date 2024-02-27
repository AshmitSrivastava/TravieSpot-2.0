import React from 'react';
import whatsapp from './assets/Images/whatsapp.png';
import logo from './assets/Images/Logo.png';

const Whatsapp = () => {
  return (
    <>
      <div className="logo fixed left-0 top-1/2 bg-slate-100 rounded-3xl">
        <a href="https://api.whatsapp.com/send/?phone=8169349915&text=Hey there, how can we help you uwu (^-^)">
          <img src={whatsapp} alt="Whatsapp" />
        </a>
      </div>
    </>
  );
};

export default Whatsapp;
