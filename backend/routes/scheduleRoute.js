// routes/eventRoutes.js
const express = require("express");
const router = express.Router();
const eventController = require("../controller/scheduleController");

// Create a new event
router.post("/events", eventController.createEvent);

// Get all events for a user
router.get("/events/:userId", eventController.getEvents);

// Update an event
router.put("/events/:id", eventController.updateEvent);

// Delete an event
router.delete("/events/:id", eventController.deleteEvent);

module.exports = router;
