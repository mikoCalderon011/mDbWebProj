const Movie = require('../models/movies.model');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const movies_service = require('../services/movies.service');
const releaseDates_service = require('../services/releaseDates.services');
const genre_service = require('../services/genres.services');
const external_ids_service = require('../services/external_ids.service');
const casts_service = require('../services/casts.service');
const crews_service = require('../services/crews.service');
const recommendations_service = require('../services/recommendation.service');
const images_service = require('../services/images.service');
const videos_service = require('../services/videos.service');

/* Display all movies */
exports.get_movies = asyncHandler(async (req, res, next) => {
   try {
      const movies = await Movie.find().exec();

      return res.status(200).json({
         success: true,
         data: movies,
      });
   } 
   catch (error) {
      throw new Error('Unexpected error precedented: ' + error.message); 
   }
});


/* Display a specific movie via ID */
exports.get_movie = asyncHandler(async (req, res, next) => {
   const { movieId } = req.params;
   const movie = await movies_service.get_movie(movieId);

   return res.status(200).json({ movie });
});

/* Search for a specific movie */
exports.search_movie = asyncHandler(async (query) => {
   try {
      const movies = await Movie.find({
         original_title: new RegExp(query, 'i')
      });

      return movies;
   }
   catch (error) {
      throw new Error('Failed to search movies: ' + error.message);
   }
});

/* Create a movie | will be revised */
exports.create_movie = asyncHandler(async (req, res, next) => {
   const requiredFields = ["original_title", "overview"];
   const missingFields = requiredFields.filter(field => !req.body[field]);

   if (missingFields.length > 0) {
      return res.status(400).json({ message: `Missing fields: ${missingFields.join(", ")}` });
   }

   console.log(typeof(req.body.adult));
   console.log(typeof(req.body.video));

   const movie = new Movie({
      adult: req.body.adult,
      backdrop_path: null,
      budget: req.body.budget || 0,
      credits: {
         cast: [], // Explicitly set to empty array
         crew: []  // Explicitly set to empty array
      },
      genres: [],
      homepage: req.body.webpage || '',
      images: { backdrops: [], posters: [], logos: [] },
      _id: new mongoose.Types.ObjectId(),
      imdb_id: null,
      external_ids: { 
         imdb_id: null,
         wikidata_id: null,
         facebook_id: null,
         instagram_id: null,
         twitter_id: null
      },
      media_type: 'movie',
      origin_country: [],
      original_language: null,
      original_title: req.body.original_title,
      overview: req.body.overview,
      popularity: null,
      poster_path: null,
      release_date: null,
      release_dates: null,
      revenue: req.body.revenue || 0,
      runtime: req.body.runtime || 0,
      status: null,
      tagline: req.body.tagline || '',
      video: req.body.video,
      videos: [],
      vote_average: 0,
      vote_count: 0
   });
   
   try {
      // Add extensive logging
      console.log('Movie Object Before Save:', JSON.stringify(movie, null, 2));
      
      await movie.save();
      return res.status(200).json({
         message: "Movie, " + req.body.original_title + ", has been created",
      });
   }
   catch (error) {
      console.error('Full Error Object:', JSON.stringify(error, null, 2));
      return res.status(500).json({
         error: error.message,
         errorDetails: error
      });
   }
});

/* Edit a movie's primary details */
exports.edit_primary_details = asyncHandler(async (req, res, next) => {
   const { movieId } = req.params;
   try {
      const primary_details = await movies_service.edit_primary_details(movieId, req.body);
      return res.status(200).json({ message: "Primary details edited successfully", primary_details });
   }
   catch (error) {
      return res.status(400).json({ message: error.message });
   }
});

/* Add release date */
exports.add_release_date = asyncHandler(async (req, res, next) => {
   const { movieId } = req.params;
   try {
      const releaseDate = await releaseDates_service.add_release_date(movieId, req.body);
      return res.status(200).json({ message: "Release date added successfully", releaseDate });
   }
   catch (error) {
      return res.status(400).json({ message: error.message });
   }
});

/* Add genre */
exports.add_genre = asyncHandler(async (req, res, next) => {
   const { movieId } = req.params;
   try {
      const genre = await genre_service.add_genre(movieId, req.body);
      return res.status(200).json({ message: "Genre date added successfully", genre });
   }
   catch (error) {
      return res.status(400).json({ message: error.message });
   }
});

/* Add external ids */
exports.add_external_ids = asyncHandler(async (req, res, next) => {
   const { movieId } = req.params;
   try {
      const external_ids = await external_ids_service.add_external_ids(movieId, req.body);
      return res.status(200).json({ message: "External Ids added successfully", external_ids });
   }
   catch (error) {
      return res.status(400).json({ message: error.message });
   }
});

exports.add_cast = asyncHandler(async (req, res, next) => {
   const { movieId } = req.params;
   try {
      const cast = await casts_service.add_cast(movieId, req.body);
      return res.status(200).json({ message: "Cast added successfully", cast });
   }
   catch (error) {
      return res.status(400).json({ message: error.message });
   }
});

exports.add_crew = asyncHandler(async (req, res, next) => {
   const { movieId } = req.params;
   try {
      const crew = await crews_service.add_crew(movieId, req.body);
      return res.status(200).json({ message: "Crew added successfully", crew });
   }
   catch (error) {
      return res.status(400).json({ message: error.message });
   }
});

exports.get_recommendations = asyncHandler(async (req, res, next) => {
   const { movieId } = req.params;
   try {
      const recommendations = await recommendations_service.get_recommendations(movieId);
      return res.status(200).json({ message: "Recommendations loaded successfully", recommendations });
   } 
   catch (error) {
      return res.status(500).json({ message: error.message });
   }
});

exports.add_backdrop = asyncHandler(async (req, res, next) => {
   const { movieId } = req.params;
   try {
      const backdrop = await images_service.add_image(movieId, req.file, 'backdrop');
      return res.status(200).json({ message: "Backdrop added successfully", backdrop });
   } 
   catch (error) {
      return res.status(500).json({ message: error.message });
   }
});

exports.add_poster = asyncHandler(async (req, res, next) => {
   const { movieId } = req.params;
   try {
      const poster = await images_service.add_image(movieId, req.file, 'poster');
      return res.status(200).json({ message: "Poster added successfully", poster });
   } 
   catch (error) {
      return res.status(500).json({ message: error.message });
   }
});

exports.add_logo = asyncHandler(async (req, res, next) => {
   const { movieId } = req.params;
   try {
      const logo = await images_service.add_image(movieId, req.file, 'logo');
      return res.status(200).json({ message: "Logo added successfully", logo });
   } 
   catch (error) {
      return res.status(500).json({ message: error.message });
   }
});

exports.add_video = asyncHandler(async (req, res, next) => {
   const { movieId } = req.params;
   try {
      const video = await videos_service.add_video(movieId, req.body);
      return res.status(200).json({ message: "Video added successfully", video });
   } 
   catch (error) {
      return res.status(500).json({ message: error.message });
   }
});

/* Delete a movie, need more revisions later on */
exports.delete_movie = asyncHandler(async (req, res, next) => {
   const { movieId } = req.params;
   try {
      const movie = await Movie.findByIdAndDelete(movieId);

      if (!movie) {
         return res.status(404).json({ message: "Movie not found" });
      }

      return res.status(200).json({ message: "Movie has been deleted", movie });
   }
   catch (error) {
      return res.status(500).json({ message: error.message });
   }
});