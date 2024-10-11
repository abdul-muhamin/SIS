const express = require('express');
const router = express.Router();
const teacherController = require('../controller/teacherController');
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
router.post('/', upload.single('photo'), teacherController.createStudent);

// Get all students
router.get('/', teacherController.getAllStudents);

// Get a student by ID
router.get('/:id', teacherController.getStudentById);

// Update a student by ID (with photo upload)
router.put('/:id', upload.single('photo'), teacherController.updateStudentById);

// Delete a student by ID
router.delete('/:id', teacherController.deleteStudentById);

// Attendance functionality routes
router.post('/:id/attendance', teacherController.addAttendance); // Add attendance
router.get('/:id/attendance', teacherController.getAttendance); // Get attendance
router.post('/:id/leave', teacherController.applyLeave);

// Get leave records for a student
router.get('/:id/leave', teacherController.getLeaves);

module.exports = router;
