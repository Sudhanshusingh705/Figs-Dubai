# API Services Guide

This directory contains API service modules that handle communication with both the backend server and third-party APIs.

## Core API Service (`api.js`)

The `api.js` file contains the main API service module that communicates with your backend server. It provides:

- A configured Axios instance with interceptors for authentication
- Organized API modules (authAPI, cartAPI, productsAPI, etc.)
- Error handling and token management

## Third-Party API Integration

### General Third-Party API Service (`thirdPartyAPI` in `api.js`)

The general third-party API integration module provides a pattern for integrating external APIs:

```javascript
// Example usage:
import { thirdPartyAPI } from '../services/api';

// Initialize with API key if needed
thirdPartyAPI.initialize('your-api-key');

// Make API calls
const data = await thirdPartyAPI.getData({ param1: 'value1' });
const response = await thirdPartyAPI.postData({ key: 'value' });
```

### Weather API Service (`weatherAPI.js`)

The `weatherAPI.js` file demonstrates integration with the OpenWeatherMap API:

```javascript
import weatherAPI from '../services/weatherAPI';

// Get current weather for a city
const weatherData = await weatherAPI.getCurrentWeatherByCity('Dubai');

// Get weather by coordinates
const coordsData = await weatherAPI.getCurrentWeatherByCoords(25.276987, 55.296249);

// Get 5-day forecast
const forecast = await weatherAPI.getForecastByCity('Dubai');

// Change units (metric/imperial)
weatherAPI.setUnits('imperial'); // For Fahrenheit
```

## Adding New Third-Party APIs

To add a new third-party API service:

1. **Create a new service file** (e.g., `paymentAPI.js`) or add to existing files
2. **Configure Axios instance** with appropriate baseURL and headers
3. **Create API methods** that wrap API endpoints
4. **Add error handling** for each API call
5. **Include helper methods** for data formatting if needed

### API Keys and Environment Variables

Store API keys in environment variables:

1. Create a `.env` file in the project root (use `.env.sample` as a template)
2. Add your API keys:
   ```
   REACT_APP_OPENWEATHER_API_KEY=your_key_here
   REACT_APP_PAYMENT_API_KEY=your_payment_key
   ```
3. Access in code using: `process.env.REACT_APP_OPENWEATHER_API_KEY`

**IMPORTANT:** Never commit actual API keys to the repository. Add `.env` to your `.gitignore` file.

## Component Integration Example

For a complete example of integrating a third-party API in a component, see:
- `WeatherWidget.js` - Example component using the weather API
- `ThirdPartyDemo.js` - Generic example using the thirdPartyAPI service

## Best Practices

1. **Separation of concerns**: Keep API services separate from UI components
2. **Error handling**: Always handle API errors in both the service and component
3. **Loading states**: Implement loading indicators while waiting for API responses
4. **Caching**: Consider caching API responses when appropriate
5. **API key security**: Never expose API keys in client-side code without proper security measures 