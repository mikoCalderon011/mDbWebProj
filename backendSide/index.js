require('dotenv').config();
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const connectDB = require('./config/dbConn');

const PORT = process.env.PORT || 3000;
connectDB();

const app = express();

mongoose.connection.once('open', () => {
   console.log('Connected to MongoDB');
   app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});