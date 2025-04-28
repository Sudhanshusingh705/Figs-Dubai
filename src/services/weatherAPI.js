import axios from 'axios';

// Create weather API service with OpenWeatherMap as an example
const weatherAPI = {
  // Create dedicated axios instance for the weather API
  client: axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
    params: {
      appid: process.env.REACT_APP_OPENWEATHER_API_KEY || '', // API key from environment variables
      units: 'metric', // Default to metric units
    },
    headers: {
      'Content-Type': 'application/json',
    },
  }),

  // Set or update API key (useful if loading from user settings)
  setApiKey: (apiKey) => {
    weatherAPI.client.defaults.params = {
      ...weatherAPI.client.defaults.params,
      appid: apiKey,
    };
  },

  // Change temperature units (metric/imperial)
  setUnits: (units) => {
    weatherAPI.client.defaults.params = {
      ...weatherAPI.client.defaults.params,
      units: units, // 'metric' for Celsius, 'imperial' for Fahrenheit
    };
  },

  // Get current weather by city name
  getCurrentWeatherByCity: async (city) => {
    try {
      const response = await weatherAPI.client.get('/weather', {
        params: { q: city }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  },

  // Get current weather by coordinates
  getCurrentWeatherByCoords: async (lat, lon) => {
    try {
      const response = await weatherAPI.client.get('/weather', {
        params: { lat, lon }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  },

  // Get 5-day weather forecast by city name
  getForecastByCity: async (city) => {
    try {
      const response = await weatherAPI.client.get('/forecast', {
        params: { q: city }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching forecast data:', error);
      throw error;
    }
  },

  // Get 5-day weather forecast by coordinates
  getForecastByCoords: async (lat, lon) => {
    try {
      const response = await weatherAPI.client.get('/forecast', {
        params: { lat, lon }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching forecast data:', error);
      throw error;
    }
  },

  // Get air pollution data by coordinates
  getAirPollution: async (lat, lon) => {
    try {
      const response = await weatherAPI.client.get('/air_pollution', {
        params: { lat, lon }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching air pollution data:', error);
      throw error;
    }
  },

  // Format temperature (helper function)
  formatTemperature: (temp, units = 'metric') => {
    const symbol = units === 'metric' ? '°C' : '°F';
    return `${Math.round(temp)}${symbol}`;
  },

  // Format weather icon URL (helper function)
  getIconUrl: (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }
};

export default weatherAPI; 