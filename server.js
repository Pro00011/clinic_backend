const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Initialize the Express app
const app = express();

// Middleware - Updated CORS to allow your live domains and admin passcode header
app.use(cors({
    origin: '*', // Allows your Vercel frontend to connect
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'x-admin-passcode'] // 👈 THIS IS THE FIX
}));

app.use(express.json()); 

// Import Routes
const bookingRoutes = require('./routes/bookingRoutes'); 

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Successfully connected to MongoDB Database!'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Use Routes
app.use('/api/bookings', bookingRoutes); 

// A simple test route
app.get('/', (req, res) => {
  res.send('PhysioCare Backend is running smoothly!');
});

// Define the port 
const PORT = process.env.PORT || 5000;

// Start the server (Explicitly binding to 0.0.0.0 for Railway)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running publicly on port ${PORT}`);
});
