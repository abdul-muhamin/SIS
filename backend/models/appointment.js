const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  date: { type: String },
  time: { type: String },
  duration: { type: Number },
  name: { type: String },
  email: { type: String },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
