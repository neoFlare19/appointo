const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const path = require('path');
const User = require('../models/User');
const Service = require('../models/Service');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const seedServices = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected'.green);

    // Get professionals
    const jane = await User.findOne({ email: 'admin@example.com' });
    const doctor = await User.findOne({ email: 'doctor@example.com' });

    if (!jane || !doctor) {
      console.log('Please run seedTestUsers.js first'.red);
      process.exit(1);
    }

    // Delete existing services
    await Service.deleteMany({});
    console.log('Existing services deleted'.yellow);

    // Services for Jane (Hair Stylist)
    const janeServices = [
      {
        name: 'Haircut',
        description: 'Professional haircut and styling',
        duration: 30,
        price: 50,
        professionalId: jane._id,
        category: 'individual'
      },
      {
        name: 'Hair Coloring',
        description: 'Full color treatment with premium products',
        duration: 90,
        price: 150,
        professionalId: jane._id,
        category: 'individual'
      },
      {
        name: 'Beard Trim',
        description: 'Precision beard trimming and shaping',
        duration: 20,
        price: 25,
        professionalId: jane._id,
        category: 'individual'
      },
      {
        name: 'Hair Styling',
        description: 'Special occasion styling',
        duration: 45,
        price: 75,
        professionalId: jane._id,
        category: 'individual'
      }
    ];

    // Services for Dr. Smith (Dentist)
    const doctorServices = [
      {
        name: 'Dental Checkup',
        description: 'Comprehensive dental examination',
        duration: 45,
        price: 120,
        professionalId: doctor._id,
        category: 'individual'
      },
      {
        name: 'Teeth Whitening',
        description: 'Professional teeth whitening treatment',
        duration: 60,
        price: 200,
        professionalId: doctor._id,
        category: 'individual'
      },
      {
        name: 'Dental Cleaning',
        description: 'Professional dental cleaning and scaling',
        duration: 45,
        price: 100,
        professionalId: doctor._id,
        category: 'individual'
      },
      {
        name: 'Consultation',
        description: 'Initial consultation and treatment planning',
        duration: 30,
        price: 80,
        professionalId: doctor._id,
        category: 'individual'
      }
    ];

    // Insert all services
    await Service.insertMany([...janeServices, ...doctorServices]);

    console.log('✅ Services seeded successfully!'.green);
    
    // Show summary
    console.log('\n📊 Service Summary:'.cyan);
    console.log(`Jane (Hair Stylist): ${janeServices.length} services`.yellow);
    console.log(`Dr. Smith (Dentist): ${doctorServices.length} services`.yellow);

    process.exit(0);
  } catch (error) {
    console.error('Error:'.red, error);
    process.exit(1);
  }
};

seedServices();