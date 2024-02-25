import React from "react";
import "./Footer.css";
import { FaSquareXTwitter, FaInstagram, FaGithub } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="outer-main">
        <div className="main">
          <div className="flogo">
            <img src="/Images/p1.png" className="flogo" />
          </div>
          <div id="box1">
            <ul>
              <div className="fhead">Home</div>
              <li>What</li>
              <li>Who</li>
              <li>Why</li>
            </ul>
          </div>
          <div id="box2">
            <ul>
              <div className="fhead">Services</div>
              <li>Shop</li>
              <li>Case Study</li>
              <li>Blog</li>
            </ul>
          </div>
          <div id="box3">
            <ul>
              <div className="fhead">About Us</div>
              <li>Company</li>
              <li>Falana</li>
              <li>Dhimkana</li>
            </ul>
          </div>
        </div>

        <div className="ficons">
          <a href="https://github.com/"><FaGithub /></a>
          <FaSquareXTwitter />
          <FaInstagram />
        </div>

        <div id="copy">
          <p>© Copyright since 1967</p>
        </div>

      </div>

    </>
  );
};

export default Footer;