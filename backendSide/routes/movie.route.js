const express = require('express');
const movie_controller = require('../controllers/movie.controller');
const upload = require('../middleware/imageUpload');
const router = express.Router();

/* GET request movie */
router.get('/', movie_controller.get_movies);

router.get('/:movieId', movie_controller.get_movie)

router.get('/:movieId/recommendations', movie_controller.get_recommendations);

/* POST request movie create */
router.post('/', movie_controller.create_movie);

router.post('/:movieId/backdrops', upload.single('backdrop'), movie_controller.add_backdrop);

router.post('/:movieId/posters', upload.single('poster'), movie_controller.add_poster);

router.post('/:movieId/logos', upload.single('logo'), movie_controller.add_logo);

router.post('/:movieId/videos', movie_controller.add_video);

/* PATCH request movie */
router.patch('/:movieId/release-date', movie_controller.add_release_date);

router.patch('/:movieId/genre', movie_controller.add_genre);

router.patch('/:movieId/external-ids', movie_controller.add_external_ids);

router.patch('/:movieId/cast', movie_controller.add_cast);

router.patch('/:movieId/crew', movie_controller.add_crew);

router.patch('/:movieId/primary-details', movie_controller.edit_primary_details);

router.patch('/:movieId/poster-path', movie_controller.edit_poster_path);

router.patch('/:movieId/backdrop-path', movie_controller.edit_backdrop_path);

/* DELETE request movie */
router.delete('/:movieId', movie_controller.delete_movie);

router.delete('/:movieId/cast/:castId', movie_controller.delete_cast);

router.delete('/:movieId/crew/:crewId', movie_controller.delete_crew);

module.exports = router;