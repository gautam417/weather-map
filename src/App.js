import React, { useState } from 'react';
import Map from './components/Map';
import axios from 'axios';

const App = () => {
  const [city, setCity] = useState(null);
  const [input, setInput] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=fb0443eb12f22190c484901e43643523`
      );

      const { coord, name } = response.data;
      setCity({ name, lat: coord.lat, lon: coord.lon });
    } catch (error) {
      console.error('Error fetching city data:', error);
      alert('City not found');
    }
  };

  return (
    <div>
      <h1>Weather Map</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {city && <Map city={city} />}
    </div>
  );
};

export default App;
