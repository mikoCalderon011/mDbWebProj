const Movie = require('../models/movies.model');
const asyncHandler = require('express-async-handler');
const { validate_language, validate_country } = require('./tmdb.api');

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
      origin_country: body.origin_country,
      original_title: body.original_title,
      title: body.title,
      overview: body.overview,
      status: body.status,
      adult: body.adult,
      video: body.video,
      runtime: body.runtime,
      revenue: body.revenue,
      budget: body.budget,
      homepage: body.homepage
   };

   await movie.updateOne({ $set: primaryDetails });

   return movie;  
});
