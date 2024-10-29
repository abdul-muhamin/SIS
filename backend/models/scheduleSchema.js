// models/Event.js
const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: true,
  },
  start: {
    type: Date,
    // required: true,
  },
  end: {
    type: Date,
    // required: true,
  },
  date: {
    type: Date,
    // required: true,
  },
  day: {
    type: String,
    // required: true,
  },
  comment: {
    type: String,
  },
  userId: {
    type: String, // Assuming userId is stored as a string in localStorage
    // required: true,
  },
  startTime: {
    type: String, // Assuming userId is stored as a string in localStorage
    // required: true,
  },
  endTime: {
    type: String, // Assuming userId is stored as a string in localStorage
    // required: true,
  },
});

module.exports = mongoose.model("Schedule", scheduleSchema);
