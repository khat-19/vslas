const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// These will be prefixed with /api/auth
router.post('/register', async (req, res) => {
  try {
    await register(req, res);
  } catch (error) {
    console.error('Registration route error:', error);
    res.status(500).json({ 
      message: 'Registration failed', 
      error: error.message 
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    await login(req, res);
  } catch (error) {
    console.error('Login route error:', error);
    res.status(500).json({ 
      message: 'Login failed', 
      error: error.message 
    });
  }
});

module.exports = router;