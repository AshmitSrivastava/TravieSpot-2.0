import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import LogoR from "./assets/Images/LogoR.png";

const Header = () => {
  return (
    <div className="navBar">
      <div className="onav">
        <NavLink to="/">
          <img src={LogoR} className="logo" />
        </NavLink>
        <ul className="nav-elements">
          <li>
            <NavLink to="/">Home </NavLink>
          </li>

          <li>
            <NavLink to="/about">About </NavLink>
          </li>

          <li>
            <NavLink to="/services">Services</NavLink>
          </li>

          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-button">
        <div className="choose-button">
          <button>Choose for me</button>
        </div>

        <div className="sign-button">
          <button>Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
