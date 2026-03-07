const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const path = require('path');
const User = require('../models/User');
const Appointment = require('../models/Appointment');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const seedAppointments = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected'.green);

    // Get users
    const john = await User.findOne({ email: 'user@example.com' });
    const sarah = await User.findOne({ email: 'sarah@example.com' });
    const jane = await User.findOne({ email: 'admin@example.com' });
    const doctor = await User.findOne({ email: 'doctor@example.com' });

    if (!john || !sarah || !jane || !doctor) {
      console.log('Please run seedTestUsers.js first'.red);
      process.exit(1);
    }

    // Delete existing appointments
    await Appointment.deleteMany({});
    console.log('Existing appointments deleted'.yellow);

    // Create appointments for John
    const johnAppointments = [
      {
        client: john._id,
        professional: jane._id,
        service: 'Haircut',
        date: new Date('2024-03-20'),
        time: '10:00 AM',
        status: 'confirmed',
        notes: 'Regular haircut'
      },
      {
        client: john._id,
        professional: doctor._id,
        service: 'Dental Checkup',
        date: new Date('2024-03-22'),
        time: '2:30 PM',
        status: 'pending',
        notes: 'First time visit'
      },
      {
        client: john._id,
        professional: jane._id,
        service: 'Beard Trim',
        date: new Date('2024-03-15'),
        time: '11:30 AM',
        status: 'completed',
        notes: 'Monthly grooming'
      }
    ];

    // Create appointments for Sarah
    const sarahAppointments = [
      {
        client: sarah._id,
        professional: jane._id,
        service: 'Hair Coloring',
        date: new Date('2024-03-21'),
        time: '11:00 AM',
        status: 'confirmed',
        notes: 'Full color treatment'
      },
      {
        client: sarah._id,
        professional: doctor._id,
        service: 'Teeth Whitening',
        date: new Date('2024-03-23'),
        time: '3:00 PM',
        status: 'confirmed',
        notes: 'Consultation first'
      },
      {
        client: sarah._id,
        professional: jane._id,
        service: 'Haircut',
        date: new Date('2024-03-18'),
        time: '9:30 AM',
        status: 'completed',
        notes: 'Regular trim'
      },
      {
        client: sarah._id,
        professional: doctor._id,
        service: 'Dental Cleaning',
        date: new Date('2024-03-10'),
        time: '1:00 PM',
        status: 'completed',
        notes: '6-month checkup'
      }
    ];

    // Create appointments for professionals (as clients booking with each other - for demo)
    const janeAppointments = [
      {
        client: jane._id,
        professional: doctor._id,
        service: 'Dental Checkup',
        date: new Date('2024-03-19'),
        time: '4:00 PM',
        status: 'pending',
        notes: 'Regular checkup'
      }
    ];

    const doctorAppointments = [
      {
        client: doctor._id,
        professional: jane._id,
        service: 'Hair Styling',
        date: new Date('2024-03-24'),
        time: '1:30 PM',
        status: 'pending',
        notes: 'Special event styling'
      }
    ];

    // Insert all appointments
    const allAppointments = [
      ...johnAppointments, 
      ...sarahAppointments,
      ...janeAppointments,
      ...doctorAppointments
    ];
    
    await Appointment.insertMany(allAppointments);

    console.log('✅ Appointments seeded successfully!'.green);
    
    // Show summary
    console.log('\n📊 Appointment Summary:'.cyan);
    console.log(`John (user@example.com): ${johnAppointments.length} appointments`.yellow);
    console.log(`Sarah (sarah@example.com): ${sarahAppointments.length} appointments`.yellow);
    console.log(`Jane (admin@example.com): ${janeAppointments.length + 2} appointments (as professional + 1 as client)`.yellow);
    console.log(`Dr. Smith (doctor@example.com): ${doctorAppointments.length + 3} appointments (as professional + 1 as client)`.yellow);

    process.exit(0);
  } catch (error) {
    console.error('Error:'.red, error);
    process.exit(1);
  }
};

seedAppointments();