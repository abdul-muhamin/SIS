const StudentModel = require('../models/studentModel');
const Notification = require("../models/notification");
const mongoose = require('mongoose');
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
        qrCode,
        status
      } = req.body;

      // Check if file was uploaded and get the file name
      const photo = req.file ? req.file.filename : null;

      const newStudent = new StudentModel({
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
        qrCode,
        photo,
        status,
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
      const students = await StudentModel.find();
      const studentsWithPhotoUrl = students.map(student => ({
        ...student._doc,
        photoUrl: student.photo ? `${req.protocol}://${req.get('host')}/uploads/${student.photo}` : null,
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
      const student = await StudentModel.findById(studentId);

      if (!student) {
        return res.status(404).json({ error: "Student not found" });
      }

      const studentWithPhotoUrl = {
        ...student._doc,
        photoUrl: student.photo ? `${req.protocol}://${req.get('host')}/uploads/${student.photo}` : null,
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
      updatedData.photo = req.file.filename;
    }

    const updatedStudent = await StudentModel.findByIdAndUpdate(studentId, updatedData, { new: true });

    if (!updatedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    const updatedStudentWithPhotoUrl = {
      ...updatedStudent._doc,
      photoUrl: updatedStudent.photo ? `${req.protocol}://${req.get('host')}/uploads/${updatedStudent.photo}` : null,
    };

    // Send notification to the student about the profile update
    const message = `Your profile data has been updated by an administrator.`;
    
    try {
      const toUserId = updatedStudent.studentId; 
      const fromUserId = req.user?.id || req.body.fromUserId || 'defaultAdminId';

      if (!toUserId) {
        return res.status(400).json({ error: "toUserId (studentId) is required" });
      }

      // Create a notification entry in the database
      await Notification.create({
        toUserId,
        fromUserId,
        message,
      });

      // Emit a Socket.io event to notify the student
//       const io = req.app.get("socketio");
// if (io && toUserId) {
//   io.to(toUserId).emit("receiveNotification", {
//     message,
//     toUserId,
//     fromUserId,
//   });
// } else {
//   console.error("Socket.io instance or toUserId is invalid.");
// }
    } catch (notificationError) {
      console.error("Error creating notification or emitting Socket.io event:", notificationError.message);
    }

    res.status(200).json(updatedStudentWithPhotoUrl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},




  // Delete student by ID
  deleteStudentById: async (req, res) => {
    try {
      const studentId = req.params.id;

      const deletedStudent = await StudentModel.findByIdAndDelete(studentId);

      if (!deletedStudent) {
        return res.status(404).json({ error: "Student not found" });
      }

      res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = studentController;
