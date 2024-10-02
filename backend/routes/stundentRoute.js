const express = require('express');
const multer = require('multer');
const router = express.Router();
const studentController = require('../controller/studentController');

// Set up Multer storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/assests/images/profiles');  // Store files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Rename the file to avoid name conflicts
  }
});

// Create the Multer upload middleware
const upload = multer({ storage: storage });

// Create a new item (with file upload)
router.post('/', upload.single('photo'), studentController.create); // 'photo' is the name of the file input

// Get all items
router.get('/', studentController.getItems);

// Get a single item by ID
router.get('/:id', studentController.getItem); // Corrected to use getItem

// Update an item by ID
router.put('/:id', upload.single('photo'), studentController.updateItem); // Allow updating with file upload

// Delete an item by ID
router.delete('/:id', studentController.deleteItem);

module.exports = router;
