import React, { useState } from 'react';
import axios from 'axios';
import './WeatherCard.css';

const WeatherCard = () => {
    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');

    const API_KEY = 'd2d526c2064841c0bb6202916240706';  // Replace with your WeatherAPI key

    const fetchWeather = async () => {
        try {
            const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`);
            setWeatherData(response.data);
            setError('');
        } catch (error) {
            setError('Location not found. Please try again.');
            setWeatherData(null);
        }
    };

    return (
        <div className="weather-card">
            <h2 id = " weather_card_h2">Travel Information</h2>
            <input
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />
            <button onClick={fetchWeather}>Get Weather</button>
            {error && <p className="error">{error}</p>}
            {weatherData && (
                <div className="weather-info">
                    <h3 className='weather_card_p'>{weatherData.location.name}, {weatherData.location.country}</h3>
                    <p className='weather_card_p'>Temperature: {weatherData.current.temp_c} °C</p>
                    <p className='weather_card_p'>Weather: {weatherData.current.condition.text}</p>
                    <p className='weather_card_p'>Humidity: {weatherData.current.humidity} %</p>
                    <p className='weather_card_p'>Wind Speed: {weatherData.current.wind_kph} kph</p>
                </div>
            )}
        </div>
    );
};

export default WeatherCard;
