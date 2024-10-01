const Student = require('../models/studentModel'); // Assuming you have a Mongoose model

exports.create = async (req, res) => {
  try {
    const student = new Student(req.body); // Create a new student with the data sent in the request
    await student.save(); // Save the student in the database
    res.status(201).json({ message: 'Student created successfully', student });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create student', error: error.message });
  }
};
  
  // Get all items
  exports.getItems = async (req, res) => {
    try {
      const students = await Student.find(); // Fetch all students
      res.json(students); // Send the students as a JSON response
    } catch (error) {
      console.error("Error fetching students:", error);
      res.status(500).json({ message: "Error fetching students" });
    }
  };
  
  // Get a single item by ID
  exports.getItem = async (req, res) => {
    try {
      const item = await item.findById(req.params.id);
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Update an item by ID
  exports.updateItem = async (req, res) => {
    const { id } = req.params; // Get the ID from the URL
    const updateData = req.body; // Get the updated data from the request body
  
    try {
      const updatedStudent = await Student.findByIdAndUpdate(id, updateData, { new: true }); // Update the student and return the new document
      res.json(updatedStudent);
    } catch (error) {
      console.error("Error updating student:", error);
      res.status(500).json({ message: "Error updating student" });
    }
  };
  
  // Delete an item by ID
  exports.deleteItem = async (req, res) => {
    const { id } = req.params; // Get the ID from the URL parameters
  
    try {
      const deletedStudent = await Student.findByIdAndDelete(id); // Delete the student by ID
      if (!deletedStudent) {
        return res.status(404).json({ message: "Student not found" }); // If no student is found, return a 404
      }
      res.json({ message: "Student deleted successfully", deletedStudent }); // Return success message
    } catch (error) {
      console.error("Error deleting student:", error);
      res.status(500).json({ message: "Error deleting student" }); // Handle any errors
    }
  };