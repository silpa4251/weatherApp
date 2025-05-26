const express = require("express");
const connectDb = require("./src/config/db");
require('dotenv').config();
const app = require("./src/app");


const PORT = process.env.PORT || 5000;
connectDb();

app.listen(PORT,()=>{
    console.log(`server connected in ${PORT}`);
})