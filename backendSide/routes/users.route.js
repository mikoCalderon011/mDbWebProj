const express = require('express');
const user_controller = require('../controllers/users.controller');

const router = express.Router();

/* POST request user create */
router.post('/register', user_controller.register);

/* POST request user create */
router.post('/login', user_controller.log_in);

module.exports = router;