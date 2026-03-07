const express = require('express');
const router = express.Router();
const {
  getAvailableDates,
  getAvailableTimeSlots
} = require('../controllers/availabilityController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/:professionalId', getAvailableDates);

// Protected routes
router.get('/:professionalId/slots', protect, getAvailableTimeSlots);

module.exports = router;