const express = require("express");
const cors = require("cors");
const weatherRoutes = require("./routes/weatherRoutes");
const errorHandler = require("./middleware/errorHandler");


const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
  }));
app.use(express.urlencoded());
app.use(express.json());

app.use("/api/weather", weatherRoutes)

app.use(errorHandler);

module.exports = app;
