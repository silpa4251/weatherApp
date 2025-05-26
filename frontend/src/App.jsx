import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentWeather, setCurrentLocation } from './redux/weatherSlice'; // Assuming redux folder is 'redux'
import WeatherCard from './components/WeatherCard';
import HourlyForecastCard from './components/HourlyForecastCard';

function App() {
  const dispatch = useDispatch();
  const { currentLocation } = useSelector((state) => state.weather);
  const [inputLocation, setInputLocation] = useState(currentLocation);

  useEffect(() => {
    // Fetch weather for the default or last set location on component mount
    dispatch(fetchCurrentWeather(currentLocation));
  }, [dispatch, currentLocation]);

  const handleSearch = () => {
    if (inputLocation.trim()) {
      dispatch(setCurrentLocation(inputLocation.trim()));
      // fetchCurrentWeather will be triggered by the useEffect due to currentLocation change
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-200 flex flex-col items-center p-4"> {/* Removed justify-center to allow content to flow from top */}
      {/* Background Image/Placeholder */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/background1.avif')" }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-30"></div> {/* Overlay for better contrast */}

      {/* Search Input - Moved to the top and centered */}
      <div className="relative z-20 w-full flex justify-center pt-8 pb-4"> {/* Added padding top/bottom */}
          <div className="flex space-x-2">
              <input
                  type="text"
                  placeholder="Enter city (e.g., Delhi)"
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
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-5xl gap-8 py-8 md:flex-row md:items-start md:justify-around">
        {/* Main Weather Card */}
        <WeatherCard />

        <div className="flex flex-col gap-8 md:gap-4 items-center md:items-start mt-8 md:mt-0">
          {/* Hourly Forecast Card */}
          <HourlyForecastCard />

          {/* Random Text Section */}
          <div className="bg-white bg-opacity-40 backdrop-filter backdrop-blur-lg rounded-3xl p-6 text-black shadow-xl max-w-xl text-center md:text-left">
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