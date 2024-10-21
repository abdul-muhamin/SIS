// attendance.routes.js

const express = require('express');
const router = express.Router();
const studentAttendanceController = require('../controller/studentAttendenceController');

// Get attendance for a student on a specific date
router.get('/students/:studentId/attendance', studentAttendanceController.getAttendanceByDate);

// Save or update attendance for a student
router.post('/students/:studentId/attendance', studentAttendanceController.saveOrUpdateAttendance);

// Delete attendance for a student on a specific date
// router.delete('/students/:studentId/attendance', studentAttendanceController.deleteAttendanceByDate);

module.exports = router;
