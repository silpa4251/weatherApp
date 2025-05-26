const { getWeatherService, getHistoryService } = require("../services/weatherServices");

const getWeather = async(req, res) => {
    const { location } = req.params;
    if(!location){
        throw new CustomError("location is required",400);
    }
    const data = await getWeatherService(location);
    res.status(200).json({ status:"success", message:"fetched the weather successfully", data})
};

const getHistory = async(req,res) => {
    const { location, fromDate, toDate } = req.query;
     if(!location, fromDate, toDate){
        throw new CustomError("location, fromDate and toDate are required",400);
    };
    const data = await getHistoryService(location, fromDate, toDate);
    res.status(200).json({ status:"success", message:"fetched the history of weather successfully", data})
};

module.exports = { getWeather, getHistory };

