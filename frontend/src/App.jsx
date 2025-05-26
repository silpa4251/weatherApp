import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
// import HourlyForecastCard from './components/HourlyForecastCard';

const BACKEND_URL = 'http://localhost:5000/api/weather'; // Your backend URL

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentLocation, setCurrentLocationState] = useState('London'); // State for displayed location
  const [inputLocation, setInputLocation] = useState('London'); // State for input field

  const fetchWeather = useCallback(async (location) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BACKEND_URL}/current/${location}`);
      console.log("hy",response.data);
      setCurrentWeather(response.data.data);
      setCurrentLocationState(location); // Update the displayed location upon successful fetch
    } catch (err) {
      console.error("Error fetching weather:", err);
      setError(err.response ? err.response.data : { msg: 'Network Error or server unreachable' });
      setCurrentWeather(null); // Clear previous weather data on error
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array means this function is created once

  useEffect(() => {
    // Fetch weather for the default or last set location on component mount
    fetchWeather(currentLocation);
  }, [fetchWeather, currentLocation]); // Re-run if fetchWeather or currentLocation changes

  const handleSearch = () => {
    if (inputLocation.trim()) {
      fetchWeather(inputLocation.trim());
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-200 flex flex-col items-center justify-center p-4">
      {/* Background Image/Placeholder */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/background-field.jpg')" }} // Place your background image in public/images/
      ></div>
      <div className="absolute inset-0 bg-black opacity-30"></div> {/* Overlay for better contrast */}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-5xl gap-8 py-8 md:flex-row md:items-start md:justify-around">
        {/* Search Input */}
        <div className="absolute top-4 right-4 z-20 flex space-x-2">
            <input
                type="text"
                placeholder="Enter city (e.g., London)"
                className="p-2 rounded-lg bg-white bg-opacity-70 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={inputLocation}
                onChange={(e) => setInputLocation(e.target.value)}
                onKeyPress={handleKeyPress}
            />
            <button
                onClick={handleSearch}
                className="p-2 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
                Search
            </button>
        </div>


        {/* Main Weather Card - Pass state as props */}
        <WeatherCard
          currentWeather={currentWeather}
          loading={loading}
          error={error}
          currentLocation={currentLocation} // Pass the effectively set location
        />

        <div className="flex flex-col gap-8 md:gap-4 items-center md:items-start mt-8 md:mt-0">
          {/* Hourly Forecast Card */}
          {/* <HourlyForecastCard /> */}

          {/* Random Text Section */}
          <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-3xl p-6 text-white shadow-xl max-w-xl text-center md:text-left">
            <h2 className="text-2xl font-bold mb-3">Random Text</h2>
            <p className="text-sm leading-relaxed">
              Improve him believe opinion offered met and end cheered forbade. Friendly as stronger speedily by
              recurred. Son interest wandered sir addition end say. Manners beloved affixed picture men ask.
              Improve him believe opinion offered met and end cheered forbade. Friendly as stronger speedily by
              recurred. Son interest wandered sir addition end say. Manners beloved affixed picture men ask.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;