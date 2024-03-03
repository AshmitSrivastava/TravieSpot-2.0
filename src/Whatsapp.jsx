import React from 'react';
import whatsapp from './assets/Images/whatsapp.png';
import logo from './assets/Images/Logo.png';

const Whatsapp = () => {
  return (
    <>
      <div className="logo fixed top-1/2 bg-[rgba(0,0,0,0.8)] rounded-3xl right-0 w-[50px] h-[50px]">
        <a href="https://api.whatsapp.com/send/?phone=8169349915&text=Hey there, how can we help you uwu (^-^)">
          <img src={whatsapp} alt="Whatsapp" className='w-[100%] h-[100%] object-cover'/>
        </a>
      </div>
    </>
  );
};

export default Whatsapp;
