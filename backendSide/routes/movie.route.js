const express = require('express');
const movie_controller = require('../controllers/movie.controller');
const router = express.Router();

// router.get('/', movie_controller.get_movies);

/* POST request movie create */
router.post('/', movie_controller.create_movie);

module.exports = router;