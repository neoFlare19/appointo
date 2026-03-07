const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getMyAppointments,
  getProfessionalAppointments,
  createAppointment,
  updateAppointmentStatus
} = require('../controllers/appointmentController');

router.use(protect); // All routes require authentication

router.get('/my-appointments', getMyAppointments);
router.get('/professional-appointments', getProfessionalAppointments);
router.post('/', createAppointment);
router.put('/:id/status', updateAppointmentStatus);

module.exports = router;