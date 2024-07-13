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
      "X-RapidAPI-Key": "631327112amsh701cfdd52be3188p1ef751jsn5a59490a26bb",
      "X-RapidAPI-Host": "flight-fare-search.p.rapidapi.com",
    },
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
      console.log("Yaha se dekho");
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
        /* cin={result.baggage.checkIn.allowance}*/
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
