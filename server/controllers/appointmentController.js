const Appointment = require('../models/Appointment');
const User = require('../models/User');

// Get user's appointments (as client)
exports.getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ client: req.user.id })
      .populate('professional', 'name profession email')
      .sort({ date: -1 });
    
    res.json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get professional's appointments (as professional)
exports.getProfessionalAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ professional: req.user.id })
      .populate('client', 'name email')
      .sort({ date: -1 });
    
    res.json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create appointment
exports.createAppointment = async (req, res) => {
  try {
    const { professionalId, service, date, time, notes } = req.body;
    
    const appointment = await Appointment.create({
      client: req.user.id,
      professional: professionalId,
      service,
      date,
      time,
      notes
    });
    
    res.status(201).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update appointment status
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ success: false, error: 'Appointment not found' });
    }
    
    // Check if user is authorized (client or professional)
    if (appointment.client.toString() !== req.user.id && 
        appointment.professional.toString() !== req.user.id) {
      return res.status(403).json({ success: false, error: 'Not authorized' });
    }
    
    appointment.status = status;
    await appointment.save();
    
    res.json({
      success: true,
      data: appointment
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};