const Movie = require('../models/movies.model');
const asyncHandler = require('express-async-handler');
const { validate_genre } = require('./tmdb.api');

exports.add_genre = asyncHandler(async (movieId, body) => {
   const movie = await Movie.findById(movieId);
   if (!movie) throw new Error("Movie not found");
   if(!body.genre) throw new Error("The 'genre' field is required");

   const genre = await validate_genre(body.genre);
   if(!genre) throw new Error(`The genre "${body.genre}" is not valid.`);

   console.log(genre)

   movie.genres.push(genre);
   await movie.save()

   return body.genre;
});