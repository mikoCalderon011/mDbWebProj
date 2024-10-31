const Movie = require('../models/movies.model');
const asyncHandler = require('express-async-handler');
const { fetch_cast_data } = require('./tmdb.api');

exports.add_cast = asyncHandler(async (movieId, body) => {
   const movie = await Movie.findById(movieId);
   if (!movie) throw new Error("Movie not found");
   
   const castData = await fetch_cast_data(body.id);

   if (!body.character) throw new Error("The 'character' field is empty");

   if (movie.casts?.cast?.some(existingCast => existingCast.id === castData.id && existingCast.character === body.character)) {
      throw new Error("Cast member with this character already exists for this movie.");
   }

   const cast = {
      gender: castData.gender,
      id: castData.id,
      known_for_department: castData.known_for_department,
      name: castData.name,
      original_name: castData.original_name || castData.name,
      popularity: castData.popularity,
      profile_path: castData.profile_path,
      cast_id: body.cast_id,
      character: body.character, 
      credit_id: `${movieId}${castData.id}`,
      order: body.order
   };

   if (!movie.casts) movie.casts = {};
   if (!movie.casts.cast) movie.casts.cast = [];

   movie.casts.cast.push(cast);
   await movie.save();

   return cast;
});