import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'
import WeatherGraph from './Weather/weathergraph';
import { FaSearch } from 'react-icons/fa'; 
import { WiHumidity, WiSunset, WiSunrise, WiDaySunny } from 'react-icons/wi'; 

const App = () => {
  const [city, setCity] = useState('Nairobi');
  const [data, setData] = useState(null);
  const [inputCity, setInputCity] = useState('');

  useEffect(() => {
    fetchData(city);
  }, [city]);

  const fetchData = async (city) => {
    try {
      const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=4e695d287066473cbd1150755242706&q=${city}&days=1&aqi=no&alerts=no`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching the weather data', error);
    }
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setCity(inputCity);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Rayn</h1>
        <div className="search-bar">
          <input
            type="text"
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
            placeholder="Enter city name"
            onKeyPress={handleSearch}
          />
          <FaSearch className="search-icon" onClick={() => setCity(inputCity)} />
        </div>
      </header>
      {data && (
        <div className="weather-info">
          <div className="weather-card">
            <h2>{data.location.name}, {data.location.country}</h2>
            <p>{data.current.temp_c}°C</p>
            <p>{data.location.localtime}</p>
            <p>{data.current.condition.text}</p>
          </div>
          <div className="weather-details">
            <div className='weather-condition'>  
              <div className='weather'>
              <div>
            <div className="weather-detail-item">
              <WiHumidity size={30} /> 
              <p>Humidity: {data.current.humidity}%</p>
            </div>
            <div className="weather-detail-item">
              <WiSunset size={30} />
              <p>Sunset: {data.forecast.forecastday[0].astro.sunset}</p>
            </div>
            </div>
            <div>
            <div className="weather-detail-item">
              <WiDaySunny size={30} />
              <p>UV Index: {data.current.uv}</p>
            </div>
            <div className="weather-detail-item">
              <WiSunrise size={30} />
              <p>Sunrise: {data.forecast.forecastday[0].astro.sunrise}</p>
            </div>
            </div>
            </div>
          <div className="monthly-rainfall">
            <p>Monthly Rainfall:<br/> 48mm</p> {/* This should be dynamic based on data */}
          </div>
          </div>
          <WeatherGraph data={data} />
        </div>
        </div>
      )}
    </div>
  );
};

export default App;
