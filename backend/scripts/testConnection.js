require('dotenv').config();
const mongoose = require('mongoose');

const testConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Successfully connected to MongoDB Atlas!');
    
    // Test creating a user
    const User = require('../models/User');
    const testUser = new User({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });

    await testUser.save();
    console.log('Test user created successfully!');
    
    // Clean up
    await User.deleteOne({ email: 'test@example.com' });
    console.log('Test user cleaned up!');
    
  } catch (error) {
    console.error('Connection error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

testConnection(); 