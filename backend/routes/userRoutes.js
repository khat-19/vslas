const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

// Protected route example
router.get('/profile', protect, async (req, res) => {
  res.json({
    user: req.user
  });
});

// Admin only route example
router.get('/users', protect, authorize('admin'), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    next(error);
  }
});

module.exports = router; 