const Movie = require('../models/movies.model');
const asyncHandler = require('express-async-handler');

exports.get_movie = asyncHandler(async (movieId) => {
   const movie = await Movie.findById(movieId).exec();

   if (!movie) throw new Error("Movie not found.");
   return movie;
})