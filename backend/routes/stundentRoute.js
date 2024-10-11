const express = require('express');
const router = express.Router();
const studentController = require('../controller/studentController');
const multer = require('multer');
const path = require('path');

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Store files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Rename file to avoid conflicts
  }
});

const upload = multer({ storage: storage });

// Create a new student (with photo upload)
router.post('/', upload.single('photo'), studentController.createStudent);

// Get all students
router.get('/', studentController.getAllStudents);

// Get a student by ID
router.get('/:id', studentController.getStudentById);

// Update a student by ID (with photo upload)
router.put('/:id', upload.single('photo'), studentController.updateStudentById);

// Delete a student by ID
router.delete('/:id', studentController.deleteStudentById);

// Attendance functionality routes
router.post('/:id/attendance', studentController.addAttendance); // Add attendance
router.get('/:id/attendance', studentController.getAttendance); // Get attendance
router.post('/:id/leave', studentController.applyLeave);

// Get leave records for a student
router.get('/:id/leave', studentController.getLeaves);

module.exports = router;
