import React, { useState, useEffect } from "react";
import {
  FaSquareXTwitter,
  FaInstagram,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import LogoR from "./assets/Images/LogoR.png";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <div className="outer-main">
        <div className="main">
          <div className="flogo">
            <img src={LogoR} className="flogo" />
          </div>
          <div className="box">
            <ul>
              <li>
                <NavLink to="/places">Places</NavLink>
              </li>
              <li>
                <NavLink to="/random">Random</NavLink>
              </li>
              <li>
                <NavLink to="/know">Know</NavLink>
              </li>
            </ul>
          </div>
          <div className="box">
            <ul>
              <li>
                <NavLink to="/shop">Shop</NavLink>
              </li>
              <li>
                <NavLink to="/flights">Flights</NavLink>
              </li>
              <li>
                <NavLink to="/trains">Trains</NavLink>
              </li>
            </ul>
          </div>
          <div className="box">
            <ul>
              <li>
                <NavLink to="/cart">Cart</NavLink>
              </li>
              <li>
                <NavLink to="/green">Go Green</NavLink>
              </li>
            </ul>
          </div>
          <div className="box">
            <ul>
              <li>
                <NavLink to="/faq">FAQ</NavLink>
              </li>
              <li>
                <NavLink to="/review">Review</NavLink>
              </li>
              <li>
                <NavLink to="/certificate">Certificate</NavLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="ficons">
          <a href="https://github.com/">
            <FaGithub />
          </a>
          <a href="https://twitter.com/">
            <FaSquareXTwitter />
          </a>
          <a href="https://www.instagram.com/">
            <FaInstagram />
          </a>
          <a href="https://www.linkedin.com/">
            <FaLinkedin />
          </a>
        </div>

        <div id="copy">
          <p>© Copyright since 2024</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
