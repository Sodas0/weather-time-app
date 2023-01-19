import React, { useState } from 'react';
import { WEATHER_API } from './constants'; 

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const handleSearch = evt => {
    if (evt.key === "Enter") {
      fetchWeather();
    }
  }

  const fetchWeather = async () => {
    try {
      const response = await fetch(`${WEATHER_API.base}weather?q=${query}&units=imperial&APPID=${WEATHER_API.key}`);
      const data = await response.json();
      setWeather(data);
      setQuery('');
    } catch (error) {
      console.error(error);
    }
  }

  const weatherClassName = () => {
    if (typeof weather.main === "undefined") {
      return 'app';
    }
    switch (weather.weather[0].main) {
      case 'Clouds':
        return 'appcloudy';
      case 'Snow':
        return 'appsnowy';
      case 'Rain':
        return 'apprainy';
      case 'Clear':
        return 'app';
      default:
        return 'app';
    }
  }

  return (
    <div className={weatherClassName()}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={handleSearch}
          />
        </div>
        {(typeof weather.main !== "undefined") && (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°F
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;