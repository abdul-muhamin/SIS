const StudentModel = require('../models/teacherModel');

// Controller for handling CRUD operations
const teacherController = {

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
        staffId,
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
        staffId,
        photo,
        status,
        qrCode ,
        attendance: [] // Initialize attendance as an empty array
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

      // Modify the photo field to include the full URL and include attendance data
      const studentsWithPhotoUrl = students.map(student => ({
        ...student._doc,  // Spread the existing student data
        photoUrl: student.photo ? `${req.protocol}://${req.get('host')}/uploads/${student.photo}` : null,
        attendance: student.attendance // Include attendance data in response
      }));

      res.status(200).json(studentsWithPhotoUrl);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get student by ID
  getStudentById: async (req, res) => {
    try {
      const staffId = req.params.id;
      const student = await StudentModel.findById(staffId);

      if (!student) {
        return res.status(404).json({ error: "Student not found" });
      }

      // Add the full URL for the photo and include attendance data
      const studentWithPhotoUrl = {
        ...student._doc,
        photoUrl: student.photo ? `${req.protocol}://${req.get('host')}/uploads/${student.photo}` : null,
        attendance: student.attendance // Include attendance data in response
      };

      res.status(200).json(studentWithPhotoUrl);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update student by ID
  updateStudentById: async (req, res) => {
    try {
      const staffId = req.params.id;
      const updatedData = req.body;

      if (req.file) {
        // If a new photo is uploaded, add the file name to the updatedData
        updatedData.photo = req.file.filename;
      }

      const updatedStudent = await StudentModel.findByIdAndUpdate(staffId, updatedData, { new: true });

      if (!updatedStudent) {
        return res.status(404).json({ error: "Student not found" });
      }

      // Include the updated photo URL and attendance data in the response
      const updatedStudentWithPhotoUrl = {
        ...updatedStudent._doc,
        photoUrl: updatedStudent.photo ? `${req.protocol}://${req.get('host')}/uploads/${updatedStudent.photo}` : null,
        attendance: updatedStudent.attendance // Include updated attendance data in response
      };

      res.status(200).json(updatedStudentWithPhotoUrl);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete student by ID
  deleteStudentById: async (req, res) => {
    try {
      const staffId = req.params.id;

      const deletedStudent = await StudentModel.findByIdAndDelete(staffId);

      if (!deletedStudent) {
        return res.status(404).json({ error: "Student not found" });
      }

      res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Add attendance record for a student
  addAttendance: async (req, res) => {
    try {
      const staffId = req.params.id;
      const { date, clockIn, clockOut } = req.body;

      // Find the student and update attendance
      const student = await StudentModel.findById(staffId);
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }

      // Push new attendance data into student object
      student.attendance = student.attendance || [];
      student.attendance.push({ date, clockIn, clockOut });

      await student.save();

      // Return updated student data including attendance
      res.status(200).json({
        ...student._doc,
        attendance: student.attendance
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get attendance for a student
  getAttendance: async (req, res) => {
    try {
      const staffId = req.params.id;
      const student = await StudentModel.findById(staffId);

      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }

      // Return attendance records
      res.status(200).json(student.attendance || []);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  applyLeave: async (req, res) => {
    try {
      const staffId = req.params.id;
      const { date, type } = req.body; // Type will be either 'full' or 'half'

      // Find the student and update leave records
      const student = await StudentModel.findById(staffId);
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }

      // Add the leave to the student's leave array
      student.leaves = student.leaves || [];
      student.leaves.push({ date, type });

      await student.save();

      // Return updated student data with leaves
      res.status(200).json({
        ...student._doc,
        leaves: student.leaves
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get all leaves for a student
  getLeaves: async (req, res) => {
    try {
      const staffId = req.params.id;
      const student = await StudentModel.findById(staffId);

      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }

      // Return leave records
      res.status(200).json(student.leaves || []);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = teacherController;
