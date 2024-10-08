const GradeModel = require('../models/gradeModel');

// Controller to add a new assignment
exports.addAssignment = async (req, res) => {
  const { courseName, mid, final } = req.body; // Destructure data from request body

  try {
    const newAssignment = new GradeModel({
      courseName,
      mid,
      final,
    });

    await newAssignment.save(); // Save to the database
    res.status(201).json(newAssignment); // Send back the saved assignment
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(400).json({ message: 'Failed to add assignment', error: error.message });
  }
}

// Controller to get all assignments
exports.getAssignments = async (req, res) => {
  try {
    const assignments = await GradeModel.find();
    res.status(200).json(assignments); // Return all assignments
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(400).json({ message: 'Failed to get assignments', error: error.message });
  }
};

// Controller to update an assignment
exports.updateAssignment = async (req, res) => {
  const { id } = req.params; // Get ID from request parameters
  const { courseName, mid, final } = req.body; // Get updated grade details from request body

  try {
    // Find the assignment by ID and update it
    const updatedAssignment = await GradeModel.findByIdAndUpdate(
      id,
      { courseName, mid, final }, // Update fields accordingly
      { new: true }
    );

    if (!updatedAssignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    res.json(updatedAssignment); // Return the updated assignment
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: 'Failed to update assignment', error: err.message });
  }
};

// Controller to delete an assignment
exports.deleteAssignment = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAssignment = await GradeModel.findByIdAndDelete(id);

    if (!deletedAssignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    res.status(200).json({ message: 'Assignment deleted successfully' });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(400).json({ message: 'Failed to delete assignment', error: error.message });
  }
};
