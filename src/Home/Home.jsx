// eslint-disable-next-line no-unused-vars
import React from "react";

const Home = () => {
  return (
    <>
      <div className="home-container">
        <div className="hero-section">
          <h1>Welcome to Our Travel Website</h1>
          <p>Explore the world with us!</p>
          <a href="/tours" className="btn btn-primary">
            View Tours
          </a>
        </div>
        <div className="featured-destinations">
          <h2>Featured Destinations</h2>
          <div className="destination">
            <img src="./Home/img/bridge.jpg" alt="Destination 1" />
            <h3>Destination 1</h3>
            <p>Explore the wonders of Destination 1.</p>
          </div>
          <div className="destination">
            <img src="./Home/img/sea.jpg" alt="Destination 2" />
            <h3>Destination 2</h3>
            <p>Experience the beauty of Destination 2.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
