const express = require('express');
const user_controller = require('../controllers/auth.controller');
const router = express.Router();

/* POST request user create */
router.post('/', user_controller.log_in);

module.exports = router;