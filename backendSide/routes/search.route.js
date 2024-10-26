const express = require('express');
const search_controller = require('../controllers/search.controller');
const router = express.Router();

/* GET request search movie, tv-shows, and people using query params */
router.get('/', search_controller.search);

module.exports = router;