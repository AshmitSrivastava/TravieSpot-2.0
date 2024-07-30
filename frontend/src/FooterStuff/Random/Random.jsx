import React, { useState } from "react";
import axios from "axios";
import CardRandom from "./CardRandom"; // Ensure this matches your actual component file path
import "./Random.css";

const Random = () => {
  const [location, setLocation] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const options = {
      method: "GET",
      url: "https://api.foursquare.com/v3/places/search",
      params: {
        query: location,
      },
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_REACT_APP_FSQ,
      },
    };

    try {
      const response = await axios.request(options);
      setSearchResults(response.data.results || []);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data from the API", error);
    }
  };

  const handleOnChange = (e) => {
    setLocation(e.target.value);
  };

  const randomIndex = searchResults.length > 0 ? Math.floor(Math.random() * searchResults.length) : 0;

  return (
    <div className="random-body">
      <div className="Random_content">
        <h1 id="random_content_h1">Feeling Lucky? Let Us Pick a Spot for You!</h1>
        <p className="random_content_p">
          <br />
          At Traviespot, we believe in adding a bit of spontaneity to your travel plans. If you're
          unsure of where to go next, let us take the reins and suggest a random spot based on your
          interests! Our random picker is here to help you discover something new and exciting.
          <br />
          <br /> <h2 id="random_content_h2">Here's How It Works:</h2>
          <br />
          <ul id="random_content_unorderlist">
            <li>
              <div className="random_content_dropdown">
                <div id="input_query" className="random_content_dropdown_head">
                  Enter Your Interests
                </div>
                <div id="input_query_content" className="random_content_dropdown_content">
                  Type in what you're interested in or what kind of activities you enjoy. This helps us
                  tailor our suggestions to match your preferences.
                </div>
              </div>
            </li>
            <li>
              <div className="random_content_dropdown">
                <div id="discover_random" className="random_content_dropdown_head">
                  Get a Random Suggestion
                </div>
                <div id="discover_random_content" className="random_content_dropdown_content">
                  Click the button, and let us pick a random spot for you! You might just discover your
                  next favorite destination.
                </div>
              </div>
            </li>
          </ul>
          Whether you're in need of a break from the ordinary or just looking for a surprise, our random
          suggestion feature is designed to spark adventure and curiosity!
        </p>
      </div>

      <div className="input-container">
        <form onSubmit={handleOnSubmit}>
          <input
            type="text"
            value={location}
            onChange={handleOnChange}
            placeholder="Enter your interests"
            className="query-box"
          />
          <button className="search-button">Find a Spot</button>
        </form>
      </div>

      <div className="result-container">
        {searchResults.length > 0 && (
          <CardRandom
            title={searchResults[randomIndex].name}
            address={searchResults[randomIndex].location.formatted_address}
            category={searchResults[randomIndex].categories[0].name}
            country={searchResults[randomIndex].location.country}
          />
        )}
      </div>
    </div>
  );
};

export default Random;
