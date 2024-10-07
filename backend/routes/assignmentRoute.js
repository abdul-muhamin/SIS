const express = require('express');
const {
  addAssignment,
  getAssignments,
  updateAssignment,
  deleteAssignment,
} = require('../controller/assignmentController');

const router = express.Router();

// Route to add a new assignment (Create)
router.post('/', addAssignment);

// Route to get all assignments (Read)
router.get('/', getAssignments);

// Route to update an assignment by ID (Update)
router.put('/:id', updateAssignment); // Corrected route

// Route to delete an assignment by ID (Delete)
router.delete('/:id', deleteAssignment);

module.exports = router;
