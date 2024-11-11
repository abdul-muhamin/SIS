const Notification = require("../models/notification");

const notificationController = {

  // Mark notification as read
  markAsRead: async (req, res) => {
    const { notificationId } = req.body;

    if (!notificationId) {
      return res.status(400).json({ error: "Notification ID is required" });
    }

    try {
      const notification = await Notification.findById(notificationId);

      if (!notification) {
        return res.status(404).json({ error: "Notification not found" });
      }

      // Mark notification as read and set the read time
      notification.isRead = true;
      notification.readTime = new Date();

      await notification.save();
      res.status(200).json({ message: "Notification marked as read", notification });
    } catch (error) {
      res.status(500).json({ error: "Error marking notification as read", details: error.message });
    }
  },

  // Fetch unread notifications for a user
  getUnreadNotifications: async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: "UserId is required" });
    }

    try {
      const notifications = await Notification.find({
        toUserId: userId,
        isRead: false,  // Only fetch unread notifications
      });

      res.status(200).json(notifications);
    } catch (error) {
      res.status(500).json({ message: "Error fetching notifications", error });
    }
  },

  // Fetch all notifications for a user
  getAllNotifications: async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: "UserId is required" });
    }

    try {
      const notifications = await Notification.find({
        toUserId: userId,  // Fetch all notifications for the user
      });

      res.status(200).json(notifications);
    } catch (error) {
      res.status(500).json({ message: "Error fetching notifications", error });
    }
  }
};

module.exports = notificationController;
