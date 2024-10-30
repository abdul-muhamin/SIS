// routes/chatbotRoutes.js

const express = require('express');
const { handleMessages, bookAppointment } = require('../controller/appointmentController');

const router = express.Router();

// POST endpoint to handle messages from the chatbot
router.post('/chat', handleMessages);

// POST endpoint to book an appointment
router.post('/book', bookAppointment);

module.exports = router;
