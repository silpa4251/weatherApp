const express = require('express');
const { getWeather, getHistory } = require('../controllers/weatherControllers');
const asyncErrorHandler = require('../middleware/asyncErrorHandler');

const weatherRouter = express.Router();

weatherRouter.get("/current/:location", asyncErrorHandler(getWeather));
weatherRouter.get("/history",asyncErrorHandler(getHistory));

module.exports = weatherRouter;