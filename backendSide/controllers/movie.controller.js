const Movie = require('../models/movies.model');
const mongoose = require('mongoose');

const asyncHandler = require('express-async-handler');

/* Display all movies */
exports.get_movies = asyncHandler(async (req, res, next) => {

});

/* Display a specific movie */
exports.get_one_movie = asyncHandler(async (req, res, next) => {

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

/* Create a movie */
exports.edit_movie = asyncHandler(async (req, res, next) => {

});

/* Create a movie */
exports.delete_movie = asyncHandler(async (req, res, next) => {

});