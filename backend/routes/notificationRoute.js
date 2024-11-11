const express = require("express");
const router = express.Router();
const notificationController = require("../controller/notificationController");

// Route to mark a notification as read
router.put('/notification/markAsRead', notificationController.markAsRead);

// Route to get unread notifications for a user
router.get('/notification/unread', notificationController.getUnreadNotifications);

// Route to get all notifications for a user
router.get('/notification', notificationController.getAllNotifications);

module.exports = router;
