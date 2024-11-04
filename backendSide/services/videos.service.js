const Movie = require('../models/movies.model');
const asyncHandler = require('express-async-handler');
const { get_video_details } = require('./youtube.api');

exports.add_video = asyncHandler(async (movieId, body) => {
   const movie = await Movie.findById(movieId);
   if (!movie) throw new Error("Movie not found");

   if (!body.key) throw new Error("The 'source key' is empty");
   const youtubeData = await get_video_details(body.key);

   const video = {
      iso_639_1: body.iso_639_1 || null,
      iso_3166_1: body.iso_3166_1 || null,
      name: youtubeData.items[0].snippet.title,
      key: body.key,
      site: body.site,
      size: body.size,  
      type: body.type,
      published_at: youtubeData.items[0].snippet.publishedAt
   };

   if (!movie.videos) movie.videos = [];

   movie.videos.push(video);
   await movie.save();

   return video;
});