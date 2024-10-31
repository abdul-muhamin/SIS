const express = require('express');
const router = express.Router();
const axios = require('axios');

// Environment variable containing the ChatBot API key
const chatbotKey = process.env.CHATBOTKIT_API_SECRET; // Make sure this is set in your .env file

// Sample calendar data for booking
const calendar = [
  { id: 1, date: '2024-03-01', time: '11:00', duration: 60 },
  { id: 2, date: '2024-03-02', time: '14:00', duration: 30 },
  // Additional slots as needed
];

// Chatbot endpoint to handle incoming requests
router.post('/chatbot', async (req, res) => {
  console.log("Incoming request:", req.body);

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    // Make a direct request to the ChatBotKit API
    const response = await axios.post(
      'https://api.chatbotkit.com/v1/conversation/complete', // Replace with the correct API URL from ChatBotKit's documentation
      {
        backstory: `You are a virtual assistant that helps manage calendar bookings with Dr. Smith.`,
        model: process.env.CHATBOTKIT_MODEL || 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: {
          'Authorization': `Bearer ${chatbotKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Log and return the response from the ChatBotKit API
    console.log("API response:", response.data);
    res.json(response.data);

  } catch (error) {
    console.error("Error in chatbot API request:", error.message);
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    }
    res.status(500).json({
      error: "Failed to fetch response from chatbot.",
      details: error.message,
    });
  }
});

module.exports = router;
