import React from 'react';
import { format } from 'date-fns';

const WeatherCard = ({ currentWeather, loading, error, currentLocation }) => {
  if (loading) {
    return (
      <div className="bg-orange-300 bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-3xl p-6 text-orange-800 shadow-xl flex flex-col items-center justify-center w-64 md:w-80 h-96">
        <p className="text-xl">Loading weather...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-300 bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-3xl p-6 text-red-800 shadow-xl flex flex-col items-center justify-center w-64 md:w-80 h-96">
        <p className="text-xl">Error: {error.msg || 'Failed to fetch weather'}</p>
        <p className="text-sm mt-2">Please check location or try again.</p>
      </div>
    );
  }

  if (!currentWeather) {
    return (
      <div className="bg-orange-300 bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-3xl p-6 text-orange-800 shadow-xl flex flex-col items-center justify-center w-64 md:w-80 h-96">
        <p className="text-xl">No weather data</p>
        <p className="text-sm mt-2">Search for a location.</p>
      </div>
    );
  }

  const weatherIconUrl = `http://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`;
  // Ensure currentWeather.date is a valid date string or Date object
  const displayDate = currentWeather.date ? format(new Date(currentWeather.date), 'dd MMM yyyy') : 'N/A';

  return (
    <div className="bg-orange-300 bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-3xl p-6 text-orange-800 shadow-xl flex flex-col items-center justify-start w-64 md:w-80 h-96 relative">
      <div className="flex items-center absolute top-4 left-6">
        <span className="font-semibold text-lg">Today</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow mt-8">
        <img src={weatherIconUrl} alt="weather icon" className="w-24 h-24 -mt-4" />
        <p className="text-7xl font-bold -mt-4">{Math.round(currentWeather.temperature)}°</p>
        <p className="text-2xl mt-2">{currentWeather.description}</p>
        <p className="text-lg mt-1">{currentWeather.location || currentLocation}</p>
        <p className="text-sm mt-1">{displayDate}</p>
      </div>

      <div className="w-full text-sm flex justify-between absolute bottom-6 px-6">
        <span>Feels like {Math.round(currentWeather.temperature)}°</span>
        <span>Sunset 18:20</span>
      </div>
    </div>
  );
};

export default WeatherCard;