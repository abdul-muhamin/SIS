// backend/models/notificationModel.js
const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  toUserId: { type: String, required: true },
  fromUserId: { type: String, required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  readTime: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
