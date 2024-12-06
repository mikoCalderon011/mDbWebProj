const Movie = require('../models/movies.model');
const asyncHandler = require('express-async-handler');

exports.add_tagline = asyncHandler(async (movieId, body) => {
   const movie = await Movie.findById(movieId).exec();
   if (!movie) throw new Error("Movie not found.");

   if (!body.tagline) throw new Error("The 'tagline' field is empty");

   if (!movie.taglines) movie.taglines = [];

   movie.taglines.push(body.tagline);

   if (!movie.tagline) movie.tagline = movie.taglines[0];

   await movie.save();

   return { message: "Tagline added successfully", tagline: movie.tagline };
})

exports.delete_tagline = asyncHandler(async (movieId, body) => {
   const movie = await Movie.findById(movieId).exec();

   if (!movie) throw new Error("Movie not found.");
   if (!body.tagline) throw new Error("Tagline to delete is required.");

   const updatedTaglines = movie.taglines.filter(taglineData => taglineData !== body.tagline);

   if (updatedTaglines.length === movie.taglines.length) throw new Error("Tagline not found in the list.");
   
   movie.taglines = updatedTaglines;
   movie.tagline = movie.taglines.length > 0 ? movie.taglines[0] : null;

   await movie.save();

   return { message: "Tagline deleted successfully", tagline: movie.tagline };
});