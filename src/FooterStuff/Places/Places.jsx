import React, { useState } from "react";
import axios from "axios";
import mountains from "./img/mountains.jpg";
import Card from "";
import "./Places.css";
const Places = () => {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const options = {
      method: "GET",
      url: "https://api.foursquare.com/v3/places/search",
      params: {
        query: query,
        near: city,
      },
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_REACT_APP_FSQ,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setSearchResults(response.data.results);
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handleQueryOnChange = (e) => {
    setQuery(e.target.value);
  };

  const handleCityOnChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <>
      <div className="Places_content">
      <h1 id="places_content_h1">Discover Your Perfect Getaway:</h1>
      <p className="places_content_p">
      <br />At Traviespot, we understand that planning the perfect trip can sometimes feel overwhelming. With so many destinations to choose from and countless activities to explore, it's easy to feel lost in a sea of options. That's why we've developed an innovative solution to simplify the travel planning process: our advanced query box feature.Gone are the days of endless scrolling through generic travel guides or sifting through countless search results.<br/><br/> <h2 id="places_content_h2">Here's how it works:</h2><br />
      <ul id="places_content_unorderlist">
    <li>
        <div class="places_content_dropdown">
            <div id="input_query" class="places_content_dropdown_head">Input Your Query</div>
            <div id="input_query_content" class="places_content_dropdown_content">
                Tell us your travel interests, passions, and must-see attractions by simply typing them into the query box. Whether you're an adrenaline junkie seeking thrilling adventures, a history buff eager to uncover ancient ruins, or a foodie on the hunt for culinary hotspots, we've got you covered.
            </div>
        </div>
    </li>
    <li>
        <div class="places_content_dropdown">
            <div id="specify_location" class="places_content_dropdown_head">Specify Your Location</div>
            <div id="specify_location_content" class="places_content_dropdown_content">
                Let us know where you're headed or where you'd like to explore. Whether it's a bustling metropolis, a tranquil countryside retreat, or an exotic island paradise, our database is brimming with diverse destinations to suit your preferences.
            </div>
        </div>
    </li>
    <li>
        <div class="places_content_dropdown">
            <div id="discover_recommendations" class="places_content_dropdown_head">Discover Tailored Recommendations</div>
            <div id="discover_recommendations_content" class="places_content_dropdown_content">
                Sit back and relax as our powerful algorithm works its magic, sifting through a vast array of travel data to curate a selection of destinations that match your interests and location. From off-the-beaten-path gems to iconic landmarks, we'll handpick the perfect places for your next adventure.
            </div>
        </div>
    </li>
</ul>
Whether you're a seasoned globetrotter in search of new horizons or a first-time traveler embarking on a journey of discovery, our query box feature empowers you to unlock the world and create unforgettable memories, one click at a time.</p>

      </div>
      
      <div className="input-container">
        <form onSubmit={handleOnSubmit}>
          <input
            type="text"
            value={query}
            onChange={handleQueryOnChange}
            placeholder="Enter query"
            className="query-box"
          />
          <input
            type="text"
            value={city}
            onChange={handleCityOnChange}
            placeholder="Enter Location"
            className="location-box"
          />
          <button className="search-button">Search</button>
        </form>
      </div>

      <div className="result-container">
        {searchResults.map((result, index) => (
          <Card
            key={index}
            title={result.name}
            address={result.location.formatted_address}
            category={result.categories[0].name}
            country={result.location.country}
          />
        ))}
      </div>
    </>
  );
};

export default Places;
