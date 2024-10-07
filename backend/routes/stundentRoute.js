// // const express = require('express');
// // // const multer = require('multer');
// // // const path = require('path'); // Make sure to import path
// // const router = express.Router();
// // const studentController = require('../controller/studentController');

// // // Set up Multer storage options
// // // const storage = multer.diskStorage({
// // //   destination: (req, file, cb) => {
// // //     cb(null, 'uploads/');  // Store files in the 'uploads' folder
// // //   },
// // //   filename: (req, file, cb) => {
// // //     cb(null, Date.now() + path.extname(file.originalname));  // Rename the file to avoid name conflicts
// // //   }
// // // });

// // // Create the Multer upload middleware
// // // const upload = multer({ 
// // //   storage: storage,
// // //   limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
// // //   fileFilter: (req, file, cb) => {
// // //     const filetypes = /jpeg|jpg|png|gif/; // Allowed file types
// // //     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
// // //     const mimetype = filetypes.test(file.mimetype);
    
// // //     if (extname && mimetype) {
// // //       return cb(null, true);
// // //     } else {
// // //       cb('Error: File upload only supports the following filetypes - ' + filetypes);
// // //     }
// // //   }
// // // });

// // // // Upload image endpoint
// // // router.post('/upload-image', upload.single('image'), (req, res) => {
// // //   if (!req.file) {
// // //     return res.status(400).json({ message: 'No file uploaded' });
// // //   }
// // //   res.status(200).json({ message: 'File uploaded successfully', filePath: `/uploads/${req.file.filename}` });
// // // });

// // // // Serve static files from the uploads directory
// // // router.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // // Student CRUD operations
// // router.post('/', studentController.create);
// // router.get('/', studentController.getItems);
// // router.get('/:id', studentController.getItem);
// // router.put('/:id', studentController.updateItem);
// // router.delete('/:id', studentController.deleteItem);

// // module.exports = router;


// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const studentController = require('../controllers/studentController');

// // Setup multer for file uploads
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/'); // Specify upload folder
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname); // Create unique file name
//     }
// });
// const upload = multer({ storage: storage });

// // POST route to create student with file upload
// router.post('/', upload.single('photo'), studentController.createStudent);

// module.exports = router;



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

module.exports = router;
