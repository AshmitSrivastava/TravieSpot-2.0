import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import FlightCard from './FlightCard';

const Flights = () => {
    const [formData, setformData] = useState({
        from:'',
        to:'',
        date:'',
        adults:'',
        type:''     
    })
    const [results, setResults] = useState([])

    const options = {
      method: 'GET',
      url: 'https://flight-fare-search.p.rapidapi.com/v2/flights/',
      params: {
        ...formData,
        currency: 'USD'
      },
      headers: {
        'X-RapidAPI-Key': '47b6ef6d4dmsh52365304ae1b633p171b3cjsn13e9575cd280',
        'X-RapidAPI-Host': 'flight-fare-search.p.rapidapi.com'
      }
    };

    async function fetchData ()
    {
    try {
        const response = await axios.request(options);
        console.log(response.data);
        setResults(response.data)
    } catch (error) {
        console.error(error);
    }
}
const handleSubmit = (e) =>{
e.preventDefault()
fetchData()
console.log("submited")
}

const handleChange = (e) => {
    setformData({
        ...formData,
        [e.target.name]: e.target.value
    });
}


    return (
        <>
        <form onSubmit={handleSubmit}>
            <h2>From: </h2> <input type='text' name='from'  value={formData.from} onChange={handleChange}></input>
            <h2>To: </h2> <input type='text' name='to'  value={formData.to} onChange={handleChange}></input>
            <h2>Date: </h2> <input type='date'name='date'  value={formData.date} onChange={handleChange}></input> 
            <h2>Number of Adults: </h2> <input type='number' name='adults'  value={formData.adults} onChange={handleChange}></input>
            <h2>Type </h2> <input type='text' name='type'  value={formData.type} onChange={handleChange}></input> 
            <button>Submit</button>        
        </form>

        {results.map((result, index) => (
          <FlightCard
            key={index}
            from={result[0].flight_name} 
            fromap={results[0].flight_name} 
            to={result[0].departureAirport.label} 
            toap={result[0].departureAirport.label} 
            cin={result.categories[0].name} 
            dur={result.categories[0].name} 
            fcode={result.categories[0].name} 
            fname={result.categories[0].name} 
            stops={result.categories[0].name} 
            tzone={result.categories[0].name} 

          />
        ))}

        </>

    )
}

export default Flights