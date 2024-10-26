const Movie = require('../models/movies.model');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const { validate_country, validate_language, validate_certification } = require('../services/tmdb.api');
const { isValidDate } = require('../services/general.services');

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

   const movie = await Movie.findById(movieId)
   if (!movie) return res.status(404).json({ message: "Movie not found" });
   if (!req.body.country) return res.status(400).json({ message: "The 'country' field is required" });


   try {
      const iso_3166_1 = await validate_country(req.body.country); // can't have a null value
      const iso_639_1 = await validate_language(req.body.language); // can have null value
      const certification = await validate_certification(req.body.certification, iso_3166_1);
      if (!iso_3166_1) return res.status(400).json({ message: "Country does not exist" });
      if (!isValidDate(req.body.release_date)) return res.status(400).json({ message: "Invalid date format. Please use yyyy-mm-dd." });

      const releaseDate = {
         certification: certification.certification,
         descriptors: req.body.descriptors || [],
         iso_639_1: iso_639_1 || "",
         note: req.body.note || "",
         release_date: new Date(req.body.release_date),
         type: certification.order
      };

      if (!movie.release_dates) {
         movie.release_dates = { results: [] };
      }

      // Check if there is already an existing release date
      const existingReleaseDate = movie.release_dates.results.find(release =>
         release.iso_3166_1 === iso_3166_1 &&
         release.release_dates.some(rd => rd.release_date.toISOString() === releaseDate.release_date.toISOString())
      );

      if (existingReleaseDate) {
         return res.status(400).json({ message: "Duplicate release date entry for this country." });
      }

      const existingCountry = movie.release_dates.results.find(release =>
         release.iso_3166_1 === iso_3166_1
      );

      if (existingCountry) {
         existingCountry.release_dates.push(releaseDate);
      } 
      else {
         const countryReleaseEntry = {
            iso_3166_1: iso_3166_1,
            release_dates: [releaseDate]
         };
         movie.release_dates.results.push(countryReleaseEntry);
      }
      await movie.save();

      return res.status(200).json({ message: "Release date added successfully", releaseDate });
   }
   catch (error) {
      return res.status(500).json({ message: "Failed to fetch country data from TMDb API" });
   }
});

/* Create a movie */
exports.delete_movie = asyncHandler(async (req, res, next) => {

});