import React, { useState } from "react";
import axios from "axios";
import mountains from "./img/mountains.jpg";
//import Card from "../Card";
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
      <div className="places-box">
        <img src={mountains} />
        <div className="input-container">
          <form onSubmit={handleOnSubmit}>
            <div className="cont-1">
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
            </div>
          </form>

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
        </div>
      </div>
    </>
  );
};

export default Places;
