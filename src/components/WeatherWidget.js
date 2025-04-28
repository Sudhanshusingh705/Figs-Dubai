import React, { useState, useEffect } from 'react';
import weatherAPI from '../services/weatherAPI';
import { FaSearch, FaTemperatureHigh, FaWind, FaTint, FaCloudSun } from 'react-icons/fa';

const WeatherWidget = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [units, setUnits] = useState('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit

  // Load weather for default city or user's location
  useEffect(() => {
    const loadDefaultWeather = async () => {
      try {
        // Try to get user's location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              try {
                setLoading(true);
                const { latitude, longitude } = position.coords;
                const data = await weatherAPI.getCurrentWeatherByCoords(latitude, longitude);
                setWeather(data);
                setCity(data.name); // Set city name from response
              } catch (err) {
                console.error('Error loading weather by location:', err);
                // Fall back to default city
                fetchWeatherForCity('Dubai');
              } finally {
                setLoading(false);
              }
            },
            (err) => {
              console.error('Geolocation error:', err);
              // Fall back to default city
              fetchWeatherForCity('Dubai');
            }
          );
        } else {
          // Geolocation not supported, use default city
          fetchWeatherForCity('Dubai');
        }
      } catch (err) {
        console.error('Error in initial weather load:', err);
        setError('Unable to load weather data. Please try again later.');
        setLoading(false);
      }
    };

    loadDefaultWeather();
  }, []);

  // When units change, update the API and refresh data if we have a city
  useEffect(() => {
    weatherAPI.setUnits(units);
    if (weather) {
      fetchWeatherForCity(city);
    }
  }, [units]);

  const fetchWeatherForCity = async (cityName) => {
    if (!cityName.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await weatherAPI.getCurrentWeatherByCity(cityName);
      setWeather(data);
      setCity(cityName);
    } catch (err) {
      console.error('Error fetching weather:', err);
      if (err.response && err.response.status === 404) {
        setError(`City "${cityName}" not found. Please check the spelling.`);
      } else {
        setError('Unable to fetch weather data. Please try again later.');
      }
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherForCity(city);
  };

  const toggleUnits = () => {
    setUnits(units === 'metric' ? 'imperial' : 'metric');
  };

  // Format date from Unix timestamp
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="weather-widget">
      <div className="weather-header">
        <h2>Weather Information</h2>
        <p>Check the current weather in your city</p>
      </div>
      
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-group">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            required
          />
          <button type="submit" className="search-button" disabled={loading}>
            <FaSearch />
          </button>
        </div>
      </form>
      
      {error && <div className="weather-error">{error}</div>}
      
      {loading ? (
        <div className="weather-loading">
          <div className="spinner"></div>
          <p>Loading weather data...</p>
        </div>
      ) : weather ? (
        <div className="weather-content">
          <div className="weather-main">
            <div className="weather-info">
              <h3>{weather.name}, {weather.sys.country}</h3>
              <p className="weather-date">{formatDate(weather.dt)}</p>
              <div className="weather-temp-container">
                <img 
                  src={weatherAPI.getIconUrl(weather.weather[0].icon)} 
                  alt={weather.weather[0].description} 
                  className="weather-icon"
                />
                <div className="weather-temp">
                  {weatherAPI.formatTemperature(weather.main.temp, units)}
                </div>
              </div>
              <p className="weather-description">{weather.weather[0].description}</p>
              <button 
                className="unit-toggle"
                onClick={toggleUnits}
              >
                Switch to {units === 'metric' ? '°F' : '°C'}
              </button>
            </div>
            
            <div className="weather-details">
              <div className="weather-detail-item">
                <FaTemperatureHigh className="detail-icon temp-icon" />
                <div>
                  <p className="detail-label">Feels Like</p>
                  <p className="detail-value">{weatherAPI.formatTemperature(weather.main.feels_like, units)}</p>
                </div>
              </div>
              
              <div className="weather-detail-item">
                <FaTint className="detail-icon humidity-icon" />
                <div>
                  <p className="detail-label">Humidity</p>
                  <p className="detail-value">{weather.main.humidity}%</p>
                </div>
              </div>
              
              <div className="weather-detail-item">
                <FaWind className="detail-icon wind-icon" />
                <div>
                  <p className="detail-label">Wind</p>
                  <p className="detail-value">
                    {weather.wind.speed} {units === 'metric' ? 'm/s' : 'mph'}
                  </p>
                </div>
              </div>
              
              <div className="weather-detail-item">
                <FaCloudSun className="detail-icon clouds-icon" />
                <div>
                  <p className="detail-label">Clouds</p>
                  <p className="detail-value">{weather.clouds.all}%</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="weather-footer">
            <p>
              Data provided by <a href="https://openweathermap.org/" target="_blank" rel="noopener noreferrer">OpenWeatherMap</a>
            </p>
          </div>
        </div>
      ) : (
        <div className="weather-empty">
          <p>Enter a city name to get weather information</p>
        </div>
      )}
      
      <style jsx>{`
        .weather-widget {
          background-color: #fff;
          border-radius: 12px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
          padding: 1.5rem;
          max-width: 600px;
          margin: 2rem auto;
          overflow: hidden;
        }
        
        .weather-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }
        
        .weather-header h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2c3e50;
          margin: 0 0 0.5rem;
        }
        
        .weather-header p {
          color: #7f8c8d;
          font-size: 0.9rem;
          margin: 0;
        }
        
        .search-form {
          margin-bottom: 1.5rem;
        }
        
        .search-input-group {
          display: flex;
          position: relative;
        }
        
        .search-input-group input {
          flex: 1;
          padding: 0.75rem 1rem;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.2s;
        }
        
        .search-input-group input:focus {
          outline: none;
          border-color: #3498db;
          box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
        }
        
        .search-button {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #3498db;
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
        }
        
        .weather-error {
          background-color: #fee2e2;
          color: #b91c1c;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
        }
        
        .weather-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem 0;
        }
        
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3498db;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .weather-content {
          display: flex;
          flex-direction: column;
        }
        
        .weather-main {
          display: flex;
          flex-wrap: wrap;
          padding: 1rem;
          background-color: #f8fafc;
          border-radius: 10px;
          margin-bottom: 1rem;
        }
        
        .weather-info {
          flex: 1;
          min-width: 200px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 1rem;
          border-right: 1px solid #e2e8f0;
        }
        
        @media (max-width: 576px) {
          .weather-info {
            border-right: none;
            border-bottom: 1px solid #e2e8f0;
            margin-bottom: 1rem;
            padding-bottom: 1.5rem;
          }
          
          .weather-main {
            flex-direction: column;
          }
        }
        
        .weather-info h3 {
          font-size: 1.3rem;
          font-weight: 700;
          color: #2c3e50;
          margin: 0 0 0.25rem;
        }
        
        .weather-date {
          color: #7f8c8d;
          font-size: 0.85rem;
          margin: 0 0 1rem;
        }
        
        .weather-temp-container {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.5rem;
        }
        
        .weather-icon {
          width: 80px;
          height: 80px;
        }
        
        .weather-temp {
          font-size: 2.5rem;
          font-weight: 700;
          color: #2c3e50;
        }
        
        .weather-description {
          font-size: 1.1rem;
          color: #3498db;
          text-transform: capitalize;
          margin: 0.5rem 0 1rem;
        }
        
        .unit-toggle {
          background-color: #e9f0f6;
          color: #3498db;
          border: none;
          border-radius: 20px;
          padding: 0.5rem 1rem;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .unit-toggle:hover {
          background-color: #d6e6f2;
        }
        
        .weather-details {
          flex: 1;
          min-width: 200px;
          padding: 1rem;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 1rem;
        }
        
        .weather-detail-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .detail-icon {
          font-size: 1.5rem;
          padding: 0.5rem;
          border-radius: 50%;
          color: white;
        }
        
        .temp-icon {
          background-color: #e74c3c;
        }
        
        .humidity-icon {
          background-color: #3498db;
        }
        
        .wind-icon {
          background-color: #2ecc71;
        }
        
        .clouds-icon {
          background-color: #95a5a6;
        }
        
        .detail-label {
          font-size: 0.8rem;
          color: #7f8c8d;
          margin: 0;
        }
        
        .detail-value {
          font-size: 1rem;
          font-weight: 600;
          color: #2c3e50;
          margin: 0.25rem 0 0;
        }
        
        .weather-footer {
          text-align: center;
          border-top: 1px solid #e2e8f0;
          padding-top: 1rem;
          font-size: 0.8rem;
          color: #7f8c8d;
        }
        
        .weather-footer a {
          color: #3498db;
          text-decoration: none;
        }
        
        .weather-footer a:hover {
          text-decoration: underline;
        }
        
        .weather-empty {
          text-align: center;
          padding: 2rem 0;
          color: #7f8c8d;
        }
      `}</style>
    </div>
  );
};

export default WeatherWidget; 