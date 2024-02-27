// eslint-disable-next-line no-unused-vars
import React from "react";
import './Home.css'
import Sec2_img1 from './img/Sec2_img1.jpg'
import Sec2_img2 from './img/Sec2_img2.jpg'
import Sec2_img3 from './img/Sec2_img3.jpg'
import Slider from "./Slider";

const Home = () => {
  return (
    <>
      <div>
        <div className="main-body">
          <div className="section1">

            
            <div className="sec1-text">
              Discover story-worthy travel moments
            </div>

          </div>

        </div>
        <div className="section2">
          <div className="button-text-sec2">
            <div className="sec2-text">
              PLAN YOUR TRIP
              <span>Where to next?</span>

            </div>
            <div className="button-container-sec2">
              <button>View all destinations</button>
            </div>
          </div>


          <img src={Sec2_img1} alt="Road bordered by majestic pillars" />
          <img src={Sec2_img2} alt="Goden gate bridge" />
          <img src={Sec2_img3} alt="Acastle" />
          
        </div>

        <Slider/>

        <div className="hero-image">
          <p>BEST IN TRAVEL 2024</p>
          <button>Discover the winners</button>
        </div>

      </div>
      </>
      );
};

export default Home;
