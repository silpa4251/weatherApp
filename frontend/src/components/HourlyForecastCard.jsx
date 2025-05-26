import React from "react";

// Placeholder for hourly data. In a real app, this would come from an API.
const dummyHourlyData = [
  { time: "Now", temp: 25, icon: "01d" },
  { time: "2 AM", temp: 25, icon: "01d" },
  { time: "3 AM", temp: 23, icon: "02d" },
  { time: "4 AM", temp: 22, icon: "02d" },
  { time: "5 AM", temp: 20, icon: "04d" },
  { time: "6 AM", temp: 25, icon: "01d" },
  { time: "7 AM", temp: 25, icon: "01d" },
  { time: "8 AM", temp: 23, icon: "02d" },
  { time: "9 AM", temp: 22, icon: "02d" },
  { time: "10 AM", temp: 20, icon: "04d" },
];

const HourlyForecastCard = () => {
  return (
    <div className="text-black bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-3xl p-4 shadow-xl max-w-xl mx-auto overflow-x-auto custom-scrollbar">
      <div className="flex space-x-6 pb-2">
        {" "}
        {/* Added pb-2 for scrollbar visibility */}
        {dummyHourlyData.map((hour, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center flex-shrink-0"
          >
            <span className="text-sm">{hour.time}</span>
            <img
              src={`http://openweathermap.org/img/wn/${hour.icon}.png`}
              alt="weather icon"
              className="w-10 h-10"
            />
            <span className="text-xl font-bold">{hour.temp}°</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecastCard;
