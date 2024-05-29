import React, { useState } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';

const CitySearch = ({ onCitySelect }) => {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');

  const validateInput = () => {
    const cityRegex = /^[a-zA-Z\s]+$/;
    if (!cityRegex.test(city)) {
      setError('Please enter a valid city name.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSearch = async () => {
    if (!validateInput()) {
      return;
    }

    try {
      const response = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=fb0443eb12f22190c484901e43643523`
      );

      if (response.data.length > 0) {
        const cityData = response.data[0];
        onCitySelect(cityData);
      } else {
        setError('No results found for the given city name.');
      }
    } catch (err) {
      setError('An error occurred while fetching data.');
    }
  };

  return (
    <div className="flex flex-col items-start mb-4">
      <div className="flex items-center mb-2">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="p-2 border border-gray-300 rounded-l"
        />
        <button onClick={handleSearch} className="p-2 bg-blue-500 text-white rounded-r">
          <FaSearch />
        </button>
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
};

export default CitySearch;
