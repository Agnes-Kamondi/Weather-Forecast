import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './Weather/weathercard';
import WeatherGraph from './Weather/weathergraph';
import './App.css';

const API_KEY = '4e695d287066473cbd1150755242706'; // Your weather API key

const App = () => {
  const [city, setCity] = useState('London'); // Default city
  const [weatherData, setWeatherData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchWeatherData = async (city) => {
    try {
      const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=1&aqi=no&alerts=no`);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCity(searchQuery);
  };

  return (
    <div className="app">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit">Search</button>
      </form>
      {weatherData && (
        <>
          <WeatherCard data={weatherData} />
          <WeatherGraph data={weatherData} />
        </>
      )}
    </div>
  );
};

export default App;
