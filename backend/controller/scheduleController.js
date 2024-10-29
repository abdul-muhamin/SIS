// controllers/eventController.js
const Event = require("../models/scheduleSchema");
const moment = require("moment");

// Create a new event
exports.createEvent = async (req, res) => {
  try {
    const { title, start, end, comment, userId } = req.body;
    const date = moment(start).format("YYYY-MM-DD"); // Date without time
    const day = moment(start).format("dddd"); // Day of the week

    const event = new Event({
      title,
      start,
      end,
      date,
      day,
      comment,
      userId,
      startTime: moment(start).format("h:mm A"), // Store only time if needed
      endTime: moment(end).format("h:mm A"),     // Store only time if needed
    });

    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find({ userId: req.params.userId });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an event
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
