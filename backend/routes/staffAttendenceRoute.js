// attendance.routes.js

const express = require('express');
const router = express.Router();
const staffAttendanceController = require('../controller/staffAttendenceController');

// Get attendance for a student on a specific date
router.get('/teachers/:staffId/teacherAttendance', staffAttendanceController.getAttendanceByDate);

// Save or update attendance for a student
router.post('/teachers/:staffId/teacherAttendance', staffAttendanceController.saveOrUpdateAttendance);

// Delete attendance for a student on a specific date
// router.delete('/students/:studentId/attendance', studentAttendanceController.deleteAttendanceByDate);

module.exports = router;
