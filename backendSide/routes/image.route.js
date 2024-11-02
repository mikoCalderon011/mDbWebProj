const express = require('express');
const image_controller = require('../controllers/image.controller');
const router = express.Router();

router.get('/:filename', image_controller.get_image);

module.exports = router;