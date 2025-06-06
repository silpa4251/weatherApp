const mongoose = require("mongoose");

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        console.log("Database connected successfully");
    } catch(error) {
        console.error("Database connection failed with error: ", error.message);
    }
}

module.exports = connectDB;