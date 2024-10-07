// const Student = require('../models/studentModel'); // Assuming you have a Mongoose model

// // // Create a new student
// // exports.create = async (req, res) => {
// //   try {
// //     const student = new Student(req.body); // Create a new student with the data sent in the request
// //     console.log(student);
// //     await student.save(); // Save the student in the database
// //     res.status(201).json({ message: 'Student created successfully', student });
// //   } catch (error) {
// //     res.status(500).json({ message: 'Failed to create student', error: error.message });
// //   }
// // };
// const Student = require('../models/studentModel'); // Import the student model

// // Create a new student with photo upload
// exports.createStudent = async (req, res) => {
//     try {
//         const { fullName, email, class: studentClass, idNumber, fatherName, motherName, fatherPhoneNumber, motherPhoneNumber, address, studentId, status } = req.body;
//         const photo = req.file ? req.file.filename : ''; // Get the uploaded photo filename
        
//         const newStudent = new Student({
//             fullName,
//             email,
//             class: studentClass,
//             idNumber,
//             fatherName,
//             motherName,
//             fatherPhoneNumber,
//             motherPhoneNumber,
//             address,
//             studentId,
//             photo,
//             status
//         });
        
//         const savedStudent = await newStudent.save();
//         res.status(201).json(savedStudent);
//     } catch (error) {
//         res.status(500).json({ message: 'Error creating student', error });
//     }
// };




// // Get all students
// exports.getItems = async (req, res) => {
//   try {
//     const students = await Student.find(); // Fetch all students
//     res.json(students); // Send the students as a JSON response
//   } catch (error) {
//     console.error("Error fetching students:", error);
//     res.status(500).json({ message: "Error fetching students", error: error.message });
//   }
// };

// // Get a single student by ID
// exports.getItem = async (req, res) => {
//   try {
//     const student = await Student.findById(req.params.id); // Use Student instead of item
//     if (!student) {
//       return res.status(404).json({ message: 'Student not found' }); // Return 404 if student not found
//     }
//     res.json(student);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching student', error: error.message }); // Consistent error response
//   }
// };

// // Update a student by ID
// exports.updateItem = async (req, res) => {
//   const { id } = req.params; // Get the ID from the URL
//   const updateData = req.body; // Get the updated data from the request body

//   try {
//     const updatedStudent = await Student.findByIdAndUpdate(id, updateData, { new: true }); // Update the student and return the new document
//     if (!updatedStudent) {
//       return res.status(404).json({ message: "Student not found" }); // Return 404 if student not found
//     }
//     res.json(updatedStudent);
//   } catch (error) {
//     console.error("Error updating student:", error);
//     res.status(500).json({ message: "Error updating student", error: error.message }); // Handle any errors
//   }
// };

// // Delete a student by ID
// exports.deleteItem = async (req, res) => {
//   const { id } = req.params; // Get the ID from the URL parameters

//   try {
//     const deletedStudent = await Student.findByIdAndDelete(id); // Delete the student by ID
//     if (!deletedStudent) {
//       return res.status(404).json({ message: "Student not found" }); // If no student is found, return a 404
//     }
//     res.json({ message: "Student deleted successfully", deletedStudent }); // Return success message
//   } catch (error) {
//     console.error("Error deleting student:", error);
//     res.status(500).json({ message: "Error deleting student", error: error.message }); // Handle any errors
//   }
// };


const StudentModel = require('../models/studentModel');

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
      const students = await StudentModel.find();

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
      const student = await StudentModel.findById(studentId);

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

      const updatedStudent = await StudentModel.findByIdAndUpdate(studentId, updatedData, { new: true });

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
