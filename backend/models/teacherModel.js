

const mongoose = require('mongoose');

// Define the Attendance schema as a sub-document
const AttendanceSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    clockIn: { type: String, required: true },
    clockOut: { type: String }
});

// Define a Leave schema to store leave records
const LeaveSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    type: { type: String, enum: ['full', 'half'], required: true }, // 'full' or 'half' leave
    status: { type: String, default: 'applied' } // Status can be 'applied', 'approved', 'rejected'
});

const TeacherSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    class: String,
    idNumber: String,
    fatherName: String,
    motherName: String,
    fatherPhoneNumber: String,
    motherPhoneNumber: String,
    address: String,
    studentId: String,
    photo: String, // Photo file name
    status: String,
    attendance: [AttendanceSchema], // Array of attendance records
    leaves: [LeaveSchema] // Array of leave records
});

const TeacherModel = mongoose.model('teacher', TeacherSchema);
module.exports = TeacherModel;
