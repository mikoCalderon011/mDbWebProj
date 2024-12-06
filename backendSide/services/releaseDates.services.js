const Movie = require('../models/movies.model');
const asyncHandler = require('express-async-handler');
const { validate_country, validate_language, validate_certification } = require('./tmdb.api');
const { isValidDate } = require('./general.services');

exports.add_release_date = asyncHandler(async (movieId, body) => {
   const movie = await Movie.findById(movieId);
   if (!movie) throw new Error("Movie not found");
   if (!body.country) throw new Error("The 'country' field is required");

   const iso_3166_1 = await validate_country(body.country); // can't have a null value
   const iso_639_1 = await validate_language(body.language); // can have null value
   const certification = await validate_certification(body.certification, iso_3166_1);

   if (!iso_3166_1) throw new Error("Country does not exist");
   if (!isValidDate(body.release_date)) throw new Error("Invalid date format. Please use yyyy-mm-dd.");

   const releaseDate = {
      certification: certification.certification,
      descriptors: body.descriptors || [],
      iso_639_1: iso_639_1 || "",
      note: body.note || "",
      release_date: new Date(body.release_date),
      type: body.type,
   };

   if (!movie.release_dates) {
      movie.release_dates = { results: [] };
   }

   const existingReleaseDate = movie.release_dates.results.find(release =>
      release.iso_3166_1 === iso_3166_1 &&
      release.release_dates.some(rd => rd.release_date.toISOString() === releaseDate.release_date.toISOString())
   );

   if (existingReleaseDate) {
      throw new Error("Duplicate release date entry for this country.");
   }

   const existingCountry = movie.release_dates.results.find(release =>
      release.iso_3166_1 === iso_3166_1
   );

   if (existingCountry) {
      existingCountry.release_dates.push(releaseDate);
   } else {
      const countryReleaseEntry = {
         iso_3166_1: iso_3166_1,
         release_dates: [releaseDate],
      };
      movie.release_dates.results.push(countryReleaseEntry);
   }

   if (!movie.release_date) movie.release_date = new Date(body.release_date);

   await movie.save();

   return releaseDate;
});