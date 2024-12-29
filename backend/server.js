require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://vsla.vercel.app'
  ],
  credentials: true
}));
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Handle root route
app.get('/', (req, res) => {
  res.json({ message: 'VSLA API is running' });
});

const PORT = process.env.PORT || 5000;

// For Vercel, we need to export the app
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;