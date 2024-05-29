import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ForecastPlayback = ({ city }) => {
  const [forecast, setForecast] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchForecast = async () => {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&appid=fb0443eb12f22190c484901e43643523`);
      setForecast(response.data.list);
    };
    fetchForecast();
  }, [city]);

  useEffect(() => {
    let interval;
    if (playing) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % forecast.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [playing, forecast]);

  if (forecast.length === 0) return null;

  const currentForecast = forecast[currentIndex];

  return (
    <div>
      <h3>5-Day Forecast</h3>
      <p>{new Date(currentForecast.dt_txt).toLocaleString()}</p>
      <p>{currentForecast.main.temp}°C</p>
      <p>{currentForecast.weather[0].description}</p>
      <button onClick={() => setPlaying(!playing)}>
        {playing ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};

export default ForecastPlayback;
