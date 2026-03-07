const Appointment = require('../models/Appointment');

// @desc    Get available dates for a professional
// @route   GET /api/availability/:professionalId
// @access  Public
exports.getAvailableDates = async (req, res) => {
  try {
    const { professionalId } = req.params;
    const { month, year } = req.query;
    
    // Generate dates for the month (you can modify this logic)
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    
    // Get booked appointments for this professional
    const bookedAppointments = await Appointment.find({
      professional: professionalId,
      date: {
        $gte: startDate,
        $lte: endDate
      }
    }).select('date');
    
    // Create a set of booked dates
    const bookedDates = new Set(
      bookedAppointments.map(apt => 
        new Date(apt.date).toDateString()
      )
    );
    
    // Generate available dates (weekdays only, not booked)
    const availableDates = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      // Skip weekends (0 = Sunday, 6 = Saturday)
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        if (!bookedDates.has(currentDate.toDateString())) {
          availableDates.push(new Date(currentDate));
        }
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    res.json({
      success: true,
      data: availableDates
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get available time slots for a specific date
// @route   GET /api/availability/:professionalId/slots
// @access  Private
exports.getAvailableTimeSlots = async (req, res) => {
  try {
    const { professionalId } = req.params;
    const { date } = req.query;
    
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
    
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    
    // Get booked appointments for this date
    const bookedAppointments = await Appointment.find({
      professional: professionalId,
      date: {
        $gte: selectedDate,
        $lt: nextDay
      }
    }).select('time');
    
    // Create a set of booked times
    const bookedTimes = new Set(bookedAppointments.map(apt => apt.time));
    
    // Generate time slots (9 AM to 5 PM, 30 min intervals)
    const timeSlots = [];
    const startHour = 9;
    const endHour = 17;
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute of [0, 30]) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayTime = new Date(2000, 0, 1, hour, minute).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        
        timeSlots.push({
          time: displayTime,
          available: !bookedTimes.has(displayTime)
        });
      }
    }
    
    res.json({
      success: true,
      data: timeSlots
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};