const express = require('express');
const router = express.Router();
const {
  getProfessionals,
  getProfessionalServices,
  getUserByEmail
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/professionals', getProfessionals);
router.get('/:professionalId/services', getProfessionalServices);

// Protected routes
router.post('/by-email', protect, getUserByEmail);

module.exports = router;