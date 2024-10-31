const Movie = require('../models/movies.model');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const releaseDates_service = require('../services/releaseDates.services');
const genre_service = require('../services/genres.services');
const external_ids_service = require('../services/external_ids.service');
const casts_service = require('../services/casts.service');
const crews_service = require('../services/crews.service');

/* Display all movies */
exports.get_movies = asyncHandler(async (req, res, next) => {

});

/* Display a specific movie via ID */
exports.get_one_movie = asyncHandler(async (req, res, next) => {

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

/* Create a movie */
exports.create_movie = asyncHandler(async (req, res, next) => {
   const requiredFields = ["original_title", "overview", "tagline", "runtime", "budget", "revenue"];
   const missingFields = requiredFields.filter(field => !req.body[field]);

   if (missingFields.length > 0) {
      return res.status(400).json({ message: `Missing fields: ${missingFields.join(", ")}` });
   }

   const movie = new Movie({
      adult: null,
      backdrop_path: null,
      budget: req.body.budget,
      genres: [],
      homepage: null,
      _id: new mongoose.Types.ObjectId(),
      imdb_id: null,
      origin_country: [],
      original_language: null,
      original_title: req.body.original_title,
      overview: req.body.overview,
      popularity: null,
      release_date: req.body.release_date,
      revenue: req.body.revenue,
      runtime: req.body.runtime,
      status: null,
      tagline: req.body.tagline,
      video: null,
      vote_average: null,
      vote_count: null
   });

   try {
      await movie.save();
      return res.status(200).json({
         message: "Movie, " + req.body.original_title + ", has been created",
      });
   }
   catch (error) {
      return res.status(500).json({
         error: error.message
      });
   }
});

/* Edit a movie */
exports.edit_movie = asyncHandler(async (req, res, next) => {

});

/* Add release date */
exports.add_release_date = asyncHandler(async (req, res, next) => {
   const { movieId } = req.params;
   try {
      const releaseDate = await releaseDates_service.add_release_date(movieId, req.body);
      return res.status(200).json({ message: "Release date added successfully", releaseDate });
   } catch (error) {
      return res.status(400).json({ message: error.message });
   }
});

/* Add genre */
exports.add_genre = asyncHandler(async (req, res, next) => {
   const { movieId } = req.params;
   try {
      const genre = await genre_service.add_genre(movieId, req.body);
      return res.status(200).json({ message: "Genre date added successfully", genre });
   } catch (error) {
      return res.status(400).json({ message: error.message });
   }
});

/* Add external ids */
exports.add_external_ids = asyncHandler(async (req, res, next) => {
   const { movieId } = req.params;
   try {
      const external_ids = await external_ids_service.add_external_ids(movieId, req.body);
      return res.status(200).json({ message: "External Ids added successfully", external_ids });
   } catch (error) {
      return res.status(400).json({ message: error.message });
   }
});

exports.add_cast = asyncHandler(async (req, res, next) => {
   const { movieId } = req.params;
   try {
      const cast = await casts_service.add_cast(movieId, req.body);
      return res.status(200).json({ message: "Cast added successfully", cast });
   } catch (error) {
      return res.status(400).json({ message: error.message });
   }
});

exports.add_crew = asyncHandler(async (req, res, next) => {
   const { movieId } = req.params;
   try {
      const crew = await crews_service.add_crew(movieId, req.body);
      return res.status(200).json({ message: "Crew added successfully", crew });
   } catch (error) {
      return res.status(400).json({ message: error.message });
   }
});