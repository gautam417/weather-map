import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker, Source, Layer } from 'react-map-gl';
import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = ({ city }) => {
  const [viewport, setViewport] = useState({
    latitude: city.lat,
    longitude: city.lon,
    zoom: 8,
    width: '100%',
    height: '100%'
  });

  const [weatherData, setWeatherData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [units, setUnits] = useState('metric');

  useEffect(() => {
    console.log('City data:', city); // Debug statement

    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=${units}&appid=fb0443eb12f22190c484901e43643523`
        );

        console.log('Weather API response:', response.data); // Debug statement

        const geoJson = {
          type: 'FeatureCollection',
          features: response.data.list.map((item, index) => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [city.lon, city.lat]
            },
            properties: {
              temperature: item.main.temp,
              description: item.weather[0].description,
              icon: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
              time: item.dt_txt,
              index
            }
          }))
        };

        console.log('GeoJSON data:', geoJson); // Debug statement

        setWeatherData(geoJson);
        setCurrentIndex(0);
      } catch (error) {
        console.error('Error fetching weather data:', error); // Debug statement
      }
    };

    fetchWeatherData();

    // Update viewport when city changes
    setViewport(v => ({
      ...v,
      latitude: city.lat,
      longitude: city.lon
    }));
  }, [city, units]);

  useEffect(() => {
    let timer;
    if (isPlaying && weatherData) {
      timer = setInterval(() => {
        setCurrentIndex(prevIndex => {
          const newIndex = prevIndex + 1;
          if (newIndex >= weatherData.features.length) {
            clearInterval(timer);
            setIsPlaying(false);
            return prevIndex;
          }
          return newIndex;
        });
      }, 3000); // Update every 3 seconds
    }
    return () => clearInterval(timer);
  }, [isPlaying, weatherData]);

  const weatherLayer = {
    id: 'weather-data',
    type: 'circle',
    paint: {
      'circle-radius': 10,
      'circle-color': '#007cbf'
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleToggleUnits = () => {
    setUnits(units === 'metric' ? 'imperial' : 'metric');
  };

  const currentFeature = weatherData?.features[currentIndex];
  const temperatureUnit = units === 'metric' ? '°C' : '°F';

  return (
    <div className="map-container">
      <ReactMapGL
        {...viewport}
        mapboxAccessToken="pk.eyJ1Ijoia2V2aW5ob3UtZXhhZnVuY3Rpb24iLCJhIjoiY2xvaHh4azBtMDJhdTJqbnhsbzhzcGR0MiJ9.hUwrT3MGeUxhGW-TNfmWjw"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={(newViewport) => setViewport(newViewport)}
      >
        {weatherData && (
          <Source id="weather-data" type="geojson" data={weatherData}>
            <Layer {...weatherLayer} />
          </Source>
        )}
        {currentFeature && (
          <Marker latitude={city.lat} longitude={city.lon}>
            <div style={{ backgroundColor: 'white', padding: '4px', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <strong>{city.name}</strong>
              <p>Temp: {currentFeature.properties.temperature}{temperatureUnit}</p>
              <p>{currentFeature.properties.description}</p>
              <p>{currentFeature.properties.time}</p>
              <img src={currentFeature.properties.icon} alt={currentFeature.properties.description} />
            </div>
          </Marker>
        )}
      </ReactMapGL>
      <div className="controls">
        <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
        <button onClick={handleToggleUnits}>Change Temperature</button>
      </div>
      {currentFeature && (
        <div className="weather-info">
          <img src={currentFeature.properties.icon} alt={currentFeature.properties.description} />
          <p>{currentFeature.properties.time}</p>
          <p>Temp: {currentFeature.properties.temperature}{temperatureUnit}</p>
          <p>{currentFeature.properties.description}</p>
        </div>
      )}
    </div>
  );
};

export default Map;
