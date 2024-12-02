const Movie = require('../models/movies.model');
const asyncHandler = require('express-async-handler');
const { validate_language } = require('./tmdb.api');

exports.get_movie = asyncHandler(async (movieId) => {
   const movie = await Movie.findById(movieId).exec();

   if (!movie) throw new Error("Movie not found.");
   return movie;
})

exports.edit_primary_details = asyncHandler(async (movieId, body) => {
   const movie = await Movie.findById(movieId);
   if (!movie) throw new Error("Movie not found");

   await validate_language(body.original_language);

   const primaryDetails = {
      original_language: body.original_language,
   };

   await movie.updateOne({ $set: primaryDetails });

   return movie;  
});
