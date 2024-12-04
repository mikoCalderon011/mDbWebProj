const Movie = require('../models/movies.model');
const asyncHandler = require('express-async-handler');
const { validate_jobs, fetch_cast_data } = require('./tmdb.api');

exports.add_crew = asyncHandler(async (movieId, body) => {
   const movie = await Movie.findById(movieId);
   if (!movie) throw new Error("Movie not found");

   const crewData = await fetch_cast_data(body.id);

   if (!body.job) throw new Error("The 'job' field is required but missing in the request.");

   const validateJob = await validate_jobs(body.department, body.job);
   if (!validateJob) throw new Error("Invalid job title for the specified department");

   if (movie.casts?.crew?.some(existingCrew => existingCrew.id === crewData.id && existingCrew.job === body.job)) {
      throw new Error("Crew member with this job already exists for this movie.");
   }
   
   const crew = {
      gender: crewData.gender,
      id: crewData.id,
      known_for_department: crewData.known_for_department,
      name: crewData.name,
      original_name: crewData.original_name || crewData.name,
      popularity: crewData.popularity,
      profile_path: crewData.profile_path,
      credit_id: `${movieId}${crewData.id}`,
      department: body.department,
      job: body.job,
   };

   console.log(crew)

   if (!movie.credits) movie.credits = {};
   if (!movie.credits.crew) movie.credits.crew = [];

   movie.credits.crew.push(crew);
   await movie.save();

   return crew;
});

exports.delete_crew = asyncHandler(async (movieId, crewId) => {
   const movie = await Movie.findById(movieId);
   if (!movie) throw new Error("Movie not found");

   const crewIdInt = parseInt(crewId, 10);

   movie.credits.crew = movie.credits.crew.filter(crew => crew.id !== crewIdInt);

   await movie.save();

   return movie.credits.crew;
});