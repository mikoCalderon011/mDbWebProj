const Movie = require('../models/movies.model');
const asyncHandler = require('express-async-handler');
const { fetch_recommendations } = require('./tmdb.api');

exports.get_recommendations = asyncHandler(async (movieId) => {
   const movie = await Movie.findById(movieId);
   if (!movie) throw new Error("Movie not found");

   const params = {
      adult: movie.adult || false,
      video: movie.video || false,
      genres: movie.genres.map(genre => genre.id).join(','),
      runtime: movie.runtime,
      vote_average: movie.vote_average || 0,
      original_language: movie.original_language || 'en',
      release_date: new Date(movie.release_date).toISOString().split('T')[0],
   }

   const recommendations = await fetch_recommendations(params);

   console.log(params);
   return recommendations;
});