const express = require('express');
const router = express.Router();
const studentController = require('../controller/studentController');

// Create a new item
router.post('/', studentController.create);

// Get all items
router.get('/', studentController.getItems);

// Get a single item by ID
router.get('/:id', studentController.getItems);

// Update an item by ID
router.put('/:id', studentController.updateItem);

// Delete an item by ID
router.delete('/:id', studentController.deleteItem);

module.exports = router;
