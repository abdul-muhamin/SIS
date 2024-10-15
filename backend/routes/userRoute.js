// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { addUser } = require('../controller/userController');

// Route to add user to MongoDB
router.post('/add-user', addUser);

module.exports = router;
