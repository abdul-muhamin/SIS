const express = require('express');
const router = express.Router();
const assignmentController = require('../controller/assignmentController');
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
router.post('/', upload.single('photo'), assignmentController.createStudent);

// Get all students
router.get('/', assignmentController.getAllStudents);

// Get a student by ID
router.get('/:id', assignmentController.getStudentById);

// Update a student by ID (with photo upload)
router.put('/:id', upload.single('photo'), assignmentController.updateStudentById);

// Delete a student by ID
router.delete('/:id', assignmentController.deleteStudentById);

module.exports = router;
