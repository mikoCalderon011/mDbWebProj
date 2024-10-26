const movie_controller = require('./movie.controller');
const mongoose = require('mongoose');

const asyncHandler = require('express-async-handler');

/* Search for a specific movie, tv-shows, or people using query */
exports.search = asyncHandler(async (req, res) => {
   const query = req.query.query;

   console.log(query)

   try {
      const [movies] = await Promise.all([
         movie_controller.search_movie(query)
      ]);

      res.json({ movies });
   }
   catch (error) {
      res.status(500).json({ error: 'Failed to search all categories: ' + error.message });
   }
});