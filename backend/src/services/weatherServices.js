const Weather = require("../models/weather");
const { default: axios } = require("axios");
const CustomError = require("../utils/customErrorr")

const HISTORICAL_LOCATIONS = ['Delhi', 'Moscow', 'Paris', 'New York', 'Sydney', 'Riyadh'];

const getWeatherService = async(location) => {
    if(!location){
        throw new CustomError("location is required",400);
    }

    const response = await axios.get(process.env.BASE_URL, {
        params: {
            q:location,
            appid: process.env.OPENWEATHER_API_KEY,
            units: 'metric',
        },
    });

    if(!response){
        throw new CustomError("error in getting the data from API",400);
    }

    const { main, weather } = response.data;
    const weatherData = new Weather({
        location: location,
        temperature: main.temp,
        description: weather[0].description,
        icon: weather[0].icon,
    });
    await weatherData.save();

    return weatherData;
};

const getHistoryService = async ( location, FormDataEvent, toDate) => {
    if(!location, fromDate, toDate){
        throw new CustomError("location, fromDate and toDate are required",400);
    };

    const from = new Date(fromDate);
    const to = new Date(toDate);
    to.setHours(23,59,59,999);

    const diffTime = Math.abs(to.getTime()- from.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if(diffDays >30){
        throw new CustomError("Maximum date range allowed is 30 days",400);
    }
    if(from > to){
        throw new CustomError("From date cannot be afetr To date",400);
    };
    if( location && !HISTORICAL_LOCATIONS.includes(location)){
        throw new CustomError("Invalid location",400);
    };

    const query = { date:{ $gte: from, $lte:to}}
    if(location){
        query.location= location;
    }
    const history = await Weather.find(query).sort({ date: -1});
    return history;
}

module.exports = { getWeatherService, getHistoryService };