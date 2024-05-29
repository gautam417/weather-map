import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherPreview = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState('metric');

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=${unit}&appid=fb0443eb12f22190c484901e43643523`);
      setWeather(response.data);
    };
    fetchWeather();
  }, [city, unit]);

  if (!weather) return null;

  return (
    <div>
      <h2>{city.name}</h2>
      <p>{weather.main.temp}° {unit === 'metric' ? 'C' : 'F'}</p>
      <p>{weather.weather[0].description}</p>
      <button onClick={() => setUnit(unit === 'metric' ? 'imperial' : 'metric')}>
        Toggle Unit
      </button>
    </div>
  );
};

export default WeatherPreview;
