
// controllers/chatbotController.js

const Calendar = require('../models/appointment');

async function handleMessages(req, res) {
    debugger
  const { messages } = req.body;""
  if (!messages || messages.length === 0) {
    return res.status(400).json({ status: 'error', message: 'No messages provided' });
  }

  // Initialize the response
  const response = { status: 'success', data: null };

  // Example backstory (you can adjust the logic here)
  const backstory = `
    You are a virtual assistant that helps with managing calendar bookings with Dr. Smith.
    Today's date is 2024-03-01.
    ...
  `;

  // Retrieve calendar events from MongoDB
  const calendarEvents = await Calendar.find();
debugger
  response.data = {
    backstory,
    calendar: calendarEvents,
  };

  return res.status(200).json(response);
}

async function bookAppointment(req, res) {
  const { date, time, duration } = req.body;

  try {
    // Create a new appointment
    const newAppointment = new Calendar({ date, time, duration });
    await newAppointment.save();

    return res.status(201).json({ status: 'success', data: newAppointment });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
}

module.exports = { handleMessages, bookAppointment };
