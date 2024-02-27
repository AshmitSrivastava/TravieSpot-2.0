import { useState } from "react";
import axios from "axios";
import Card from "./Card";

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
      <form onSubmit={handleOnSubmit}>
        <div className="cont-1 grid grid-cols-3 m-2 p-5 ml-14 bg-slate-300">
          <input
            type="text"
            value={query}
            onChange={handleQueryOnChange}
            placeholder="Enter query"
            className="bg-slate-600 w-2/3 h-14 p-2 border-black text-3xl text-white"
          />
          <input
            type="text"
            value={city}
            onChange={handleCityOnChange}
            placeholder="Enter Location"
            className="bg-slate-600 w-2/3 h-14 p-2 border-black border-solid text-3xl text-white"
          />
          <button className="bg-blue-900 w-2/5 rounded-2xl p-2 font-bold font-xl text-white">
            Search
          </button>
        </div>
      </form>

      <div className="o-container grid grid-cols-3 bg-black">
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
