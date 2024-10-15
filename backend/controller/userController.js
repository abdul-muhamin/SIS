// controllers/userController.js
const User = require('../models/user');

// Add User to MongoDB
exports.addUser = async (req, res) => {
  const { email, userId, role, provider } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = new User({
      email,
      userId,
      role,
      provider,
    });

    // Save the user in MongoDB
    await newUser.save();

    return res.status(201).json({ message: 'User added successfully', user: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};
