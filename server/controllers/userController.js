const User = require('../models/User');
const Service = require('../models/Service');

// @desc    Get all professionals
// @route   GET /api/users/professionals
// @access  Public
exports.getProfessionals = async (req, res) => {
  try {
    const professionals = await User.find({ role: 'professional' })
      .select('-password')
      .sort({ name: 1 });
    
    res.json({
      success: true,
      count: professionals.length,
      data: professionals
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get services by professional
// @route   GET /api/users/:professionalId/services
// @access  Public
exports.getProfessionalServices = async (req, res) => {
  try {
    const services = await Service.find({ professionalId: req.params.professionalId })
      .sort({ name: 1 });
    
    res.json({
      success: true,
      count: services.length,
      data: services
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get user by email
// @route   POST /api/users/by-email
// @access  Private
exports.getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select('-password');
    
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};