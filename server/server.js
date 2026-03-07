const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const colors = require('colors');
const path = require('path'); // Add this
const connectDB = require('./config/db');
const appointments = require('./routes/appointmentRoutes');
const users = require('./routes/userRoutes');
const availability = require('./routes/availabilityRoutes');


// Load env vars - FIX THE PATH
dotenv.config({ path: path.join(__dirname, '.env') });

// Connect to database
connectDB();

// Route files
const auth = require('./routes/authRoutes');

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000', // Your React app URL
  credentials: true
}));

// Mount routers
app.use('/api/auth', auth);

app.use('/api/appointments', appointments);

app.use('/api/users', users);
app.use('/api/availability', availability);


// Home route
app.get('/', (req, res) => {
  res.send('Appointo API is running...');
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Server Error'
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.yellow.bold);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});