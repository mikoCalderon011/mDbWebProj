require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require("mongoose");
const connectDB = require('./config/dbConn');
const createError = require('http-errors'); // You need to require this for the error handling

// Routers
const usersRouter = require('./routes/users.route');

const app = express(); // Initialize the Express app

const PORT = process.env.PORT || 3000;
connectDB(); // Connect to the database

app.use(express.json()); // Middleware to parse JSON bodies

app.use('/users', usersRouter); // Set up users router

// Catch 404 and forward to error handler
app.use((req, res, next) => {
   next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
   // Set locals, only providing error in development
   res.locals.message = err.message;
   res.locals.error = req.app.get('env') === 'development' ? err : {};

   // Render the error page
   res.status(err.status || 500);
   res.json({
      error: {
         message: res.locals.message,
         error: res.locals.error
      }
   });
});

// Connection event listener
mongoose.connection.once('open', () => {
   console.log('Connected to MongoDB');
   app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
