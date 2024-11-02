const mongoose = require('mongoose');

// Attendance Schema
const attendanceSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId, // Use ObjectId for references to the Student model
      ref: 'student', // Assuming you have a Student model
      // required: true, // It's often important to ensure a studentId is always present
    },
    attendances: [
      {
        date: {
          type: String,
          // required: true, // It’s usually a good practice to enforce this
        },
        clockIn: {
          type: String,
          default: '', // Consider using a Date type for better time management
        },
        clockOut: {
          type: String,
          default: '',
        },
        leaveType: {
          type: String,
          default: '',
        },
        isArchived: {
          type: Boolean,
          default: false, // Default value for isArchived
        },
      },
    ],
  },
  { collection: 'student_attendance' }
);

// Create and export Attendance model
const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
