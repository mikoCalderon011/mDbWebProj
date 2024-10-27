const Movie = require('../models/movies.model');
const asyncHandler = require('express-async-handler');

exports.add_external_ids = asyncHandler(async (movieId, body) => {
   const movie = await Movie.findById(movieId);
   if (!movie) throw new Error("Movie not found");

   const external_ids = {
      imdb_id: body.imdb_id || movie.external_ids.imdb_id,
      wikidata_id: body.wikidata_id || movie.external_ids.wikidata_id,
      facebook_id: body.facebook_id || movie.external_ids.facebook_id,
      instagram_id: body.instagram_id || movie.external_ids.instagram_id,
      twitter_id: body.twitter_id || movie.external_ids.twitter_id
   }

   movie.external_ids = external_ids;
   await movie.save();

   return external_ids;
});