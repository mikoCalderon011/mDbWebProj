const express = require('express');
const movie_controller = require('../controllers/movie.controller');
const router = express.Router();

// router.get('/', movie_controller.get_movies);

/* POST request movie create */
router.post('/', movie_controller.create_movie);

router.patch('/:movieId/release-date', movie_controller.add_release_date);

router.patch('/:movieId/genre', movie_controller.add_genre);

router.patch('/:movieId/external-ids', movie_controller.add_external_ids);

router.patch('/:movieId/cast', movie_controller.add_cast);

router.patch('/:movieId/crew', movie_controller.add_crew);

router.get('/:movieId/recommendations', movie_controller.get_recommendations);

module.exports = router;