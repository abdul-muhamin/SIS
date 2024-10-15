// models/User.js
const mongoose = require('mongoose');

// Create User Schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    default: 'Student', // You can set default role here
  },
  provider: {
    type: String,
    default: 'email', // Can be 'google', 'facebook', or 'email'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export User model
const User = mongoose.model('User', userSchema);
module.exports = User;
