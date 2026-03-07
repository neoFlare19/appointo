const express = require('express');
const router = express.Router();
const {
  registerClient,
  registerProfessional,
  login,
  getMe
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Public routes
router.post('/register/client', registerClient);
router.post('/register/professional', registerProfessional);
router.post('/login', login);

// Protected routes
router.get('/me', protect, getMe);

module.exports = router;