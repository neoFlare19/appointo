const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const path = require('path'); // Add this
const User = require('../models/User');

// Load env vars - FIX THE PATH
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const testUsers = [
  {
    name: 'John Client',
    email: 'user@example.com',
    password: 'password',
    role: 'client'
  },
  {
    name: 'Jane Professional',
    email: 'admin@example.com',
    password: 'password',
    role: 'professional',
    profession: 'Hair Stylist'
  },
  {
    name: 'Dr. Smith',
    email: 'doctor@example.com',
    password: 'password',
    role: 'professional',
    profession: 'Dentist'
  },
  {
    name: 'Sarah Client',
    email: 'sarah@example.com',
    password: 'password',
    role: 'client'
  }
];

const seedUsers = async () => {
  try {
    // Connect to DB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected'.cyan.underline);

    // Delete existing test users
    await User.deleteMany({
      email: { 
        $in: testUsers.map(user => user.email) 
      }
    });
    console.log('Existing test users deleted'.red);

    // Create new test users
    const createdUsers = await User.create(testUsers);
    console.log(`${createdUsers.length} test users created`.green.underline);

    // Log credentials
    console.log('\nTest Users Created:'.yellow.bold);
    createdUsers.forEach(user => {
      console.log(`
${user.role === 'professional' ? '👨‍⚕️' : '👤'} ${user.name}:
   Email: ${user.email}
   Password: password
   Role: ${user.role}
   ${user.profession ? `Profession: ${user.profession}` : ''}
      `);
    });

    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

seedUsers();