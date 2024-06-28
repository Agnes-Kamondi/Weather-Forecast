import React from 'react';

const WeatherCard = ({ data }) => {
  const { temp_c, humidity, uv } = data.current;
  const { name, country } = data.location;
  const { sunrise, sunset } = data.forecast.forecastday[0].astro;

  return (
    <div className="weather-card">
      <h2>{name}, {country}</h2>
      <p>Temperature: {temp_c}°C</p>
      <p>Humidity: {humidity}%</p>
      <p>UV Index: {uv}</p>
      <p>Sunrise: {sunrise}</p>
      <p>Sunset: {sunset}</p>
    </div>
  );
};

export default WeatherCard;

