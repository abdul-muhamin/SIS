const AssignmentModel = require('../models/assignmentModel');

// Controller for handling CRUD operations
const studentController = {

  // Create a new student with file upload
  createStudent: async (req, res) => {
    try {
      const {
        fullName,
        email,
        class: studentClass,
        idNumber,
        fatherName,
        motherName,
        fatherPhoneNumber,
        motherPhoneNumber,
        address,
        studentId,
        status
      } = req.body;

      // Check if file was uploaded and get the file name
      const photo = req.file ? req.file.filename : null;

      const newStudent = new AssignmentModel({
        fullName,
        email,
        class: studentClass,
        idNumber,
        fatherName,
        motherName,
        fatherPhoneNumber,
        motherPhoneNumber,
        address,
        studentId,
        photo,
        status
      });

      const savedStudent = await newStudent.save();

      // Add photoUrl to the response
      const studentWithPhotoUrl = {
        ...savedStudent._doc,
        photoUrl: photo ? `${req.protocol}://${req.get('host')}/uploads/${photo}` : null
      };

      res.status(201).json(studentWithPhotoUrl);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get all students
  getAllStudents: async (req, res) => {
    try {
      const students = await AssignmentModel
      .find();

      // Modify the photo field to include the full URL
      const studentsWithPhotoUrl = students.map(student => ({
        ...student._doc,  // Spread the existing student data
        photoUrl: student.photo ? `${req.protocol}://${req.get('host')}/uploads/${student.photo}` : null
      }));

      res.status(200).json(studentsWithPhotoUrl);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get student by ID
  getStudentById: async (req, res) => {
    try {
      const studentId = req.params.id;
      const student = await AssignmentModel.findById(studentId);

      if (!student) {
        return res.status(404).json({ error: "Student not found" });
      }

      // Add the full URL for the photo
      const studentWithPhotoUrl = {
        ...student._doc,
        photoUrl: student.photo ? `${req.protocol}://${req.get('host')}/uploads/${student.photo}` : null
      };

      res.status(200).json(studentWithPhotoUrl);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update student by ID
  updateStudentById: async (req, res) => {
    try {
      const studentId = req.params.id;
      const updatedData = req.body;

      if (req.file) {
        // If a new photo is uploaded, add the file name to the updatedData
        updatedData.photo = req.file.filename;
      }

      const updatedStudent = await AssignmentModel.findByIdAndUpdate(studentId, updatedData, { new: true });

      if (!updatedStudent) {
        return res.status(404).json({ error: "Student not found" });
      }

      // Include the updated photo URL in the response
      const updatedStudentWithPhotoUrl = {
        ...updatedStudent._doc,
        photoUrl: updatedStudent.photo ? `${req.protocol}://${req.get('host')}/uploads/${updatedStudent.photo}` : null
      };

      res.status(200).json(updatedStudentWithPhotoUrl);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete student by ID
  deleteStudentById: async (req, res) => {
    try {
      const studentId = req.params.id;

      const deletedStudent = await AssignmentModel.findByIdAndDelete(studentId);

      if (!deletedStudent) {
        return res.status(404).json({ error: "Assignment not found" });
      }

      res.status(200).json({ message: "Assignment deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = studentController;
