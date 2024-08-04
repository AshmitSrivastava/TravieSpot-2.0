import React, { useState } from "react";
import axios from "axios";
import FlightCard from "./FlightCard";

const Flights = () => {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    adults: "",
    type: "",
  });

  const [results, setResults] = useState([]);

  const options = {
    method: "GET",
    url: "https://flight-fare-search.p.rapidapi.com/v2/flights/",
    headers: {
      "X-RapidAPI-Key": "47b6ef6d4dmsh52365304ae1b633p171b3cjsn13e9575cd280",
      "X-RapidAPI-Host": "flight-fare-search.p.rapidapi.com",
    },
    withCredentials: false, // Setting this is set to false cause CORS Error aa raha hai
  };

  const fetchData = async () => {
    try {
      const response = await axios.request({
        ...options,
        params: {
          ...formData,
          currency: "USD",
        },
      });
      console.log(response.data);
      setResults(response.data.results || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
    console.log("submitted");
    console.log(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const renderFlightCards = () => {
    return results.map((result, index) => (
      <FlightCard
        key={index}
        from={result.departureAirport.city}
        fromap={result.departureAirport.label}
        fromcou={result.departureAirport.country.label}
        to={result.arrivalAirport.label}
        toap={result.arrivalAirport.city}
        tocou={result.arrivalAirport.country.label}
        tzone={result.arrivalAirport.timeZone}
        dur={result.duration.text}
        fcode={result.flight_code}
        fname={result.flight_name}
        stops={result.stops}
      />
    ));
  };

  return (
    <>
      <div
        className="bgimg"
        style={{
          backgroundImage: `url(https://img.freepik.com/free-photo/jumbo-jet-flying-sky_23-2150895685.jpg)`,
          height: "100vh",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>
      <form id="flightsform" onSubmit={handleSubmit}>
        <h2>From: </h2>
        <input
          type="text"
          name="from"
          value={formData.from}
          onChange={handleChange}
        />
        <h2>To: </h2>
        <input
          type="text"
          name="to"
          value={formData.to}
          onChange={handleChange}
        />
        <h2>Date: </h2>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        <h2>Number of Adults: </h2>
        <input
          type="number"
          name="adults"
          value={formData.adults}
          onChange={handleChange}
        />
        <h2>Type: </h2>
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
        />
        <button type="submit" id="flibtn">
          Submit
        </button>
      </form>

      {results.length > 0 && renderFlightCards()}
    </>
  );
};

export default Flights;
