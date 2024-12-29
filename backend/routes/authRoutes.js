const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// These will be prefixed with /api/auth
router.post('/register', register);
router.post('/login', login);

module.exports = router;