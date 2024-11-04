// attendance.controller.js

const {isOnTime , isAbsent , isEarlyDeparture ,isTimeOff} = require('../services/utils');
const Attendance = require('../models/studentattendenceModel');
const moment = require('moment');

// Helper function to format date as YYYY-MM-DD
const formatDate = (dateInput) => {
  const date = new Date(dateInput);
  const year = date.getFullYear();
  const month = (`0${date.getMonth() + 1}`).slice(-2); // Ensure 2 digits
  const day = (`0${date.getDate()}`).slice(-2);        // Ensure 2 digits
  return `${year}-${month}-${day}`;
};

// Add or update attendance for a specific student
exports.saveOrUpdateAttendance = async (req, res) => {
  const { studentId } = req.params;
  let { date, clockIn, clockOut, leaveType } = req.body;

  try {
    // Ensure date is in YYYY-MM-DD format
    date = formatDate(date);

    // Find the student by studentId
    const attendanceRecord = await Attendance.findOne({ studentId });

    if (attendanceRecord) {
      // Check if there's an attendance for the specified date
      const existingDateIndex = attendanceRecord.attendances.findIndex(
        (att) => att.date === date
      );

      if (existingDateIndex >= 0) {
        // Update the existing attendance record for the date
        attendanceRecord.attendances[existingDateIndex] = {
          date,
          clockIn,
          clockOut,
          leaveType,
        };
      } else {
        // Push a new attendance record if it doesn't exist
        attendanceRecord.attendances.push({
          date,
          clockIn,
          clockOut,
          leaveType,
        });
      }

      // Save the updated or new attendance
      await attendanceRecord.save();

      // Exclude _id and id before sending the response
      const sanitizedAttendance = attendanceRecord.attendances.map((att) => ({
        date: att.date,
        clockIn: att.clockIn,
        clockOut: att.clockOut,
        leaveType: att.leaveType,
        isArchived: att.isArchived,
      }));

      return res.status(200).json({ message: 'Attendance updated or added.', attendances: sanitizedAttendance });
    } else {
      // Create a new record with the attendance if student doesn't exist
      const newAttendance = new Attendance({
        studentId,
        attendances: [
          {
            date,
            clockIn,
            clockOut,
            leaveType,
          },
        ],
      });

      await newAttendance.save();

      const sanitizedAttendance = newAttendance.attendances.map((att) => ({
        date: att.date,
        clockIn: att.clockIn,
        clockOut: att.clockOut,
        leaveType: att.leaveType,
        isArchived: att.isArchived,
      }));

      return res.status(201).json({ message: 'New student attendance created.', attendances: sanitizedAttendance });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to save or update attendance.' });
  }
};


// Get attendance for a student by date
exports.getAttendanceByDate = async (req, res) => {
  const { studentId } = req.params;
  let { date } = req.query;

  try {
    // Ensure date is in YYYY-MM-DD format
    date = formatDate(date);

    // Find attendance record for the student
    const attendanceRecord = await Attendance.findOne(
      { studentId },
      // { "attendances._id": 0, "attendances.id": 0 } // Exclude _id and id from attendances array
    );

    if (!attendanceRecord) {
      return res.status(404).json({ message: 'No attendance record found for this student.' });
    }

    // Find the attendance for the specified date
    const attendance = attendanceRecord.attendances.find(
      (att) => att.date === date
    );

    if (!attendance) {
      return res.status(404).json({ message: 'No attendance found for the specified date.' });
    }

    return res.status(200).json({
      date: attendance.date,
      clockIn: attendance.clockIn,
      clockOut: attendance.clockOut,
      leaveType: attendance.leaveType,
      isArchived: attendance.isArchived,
    });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while fetching attendance.' });
  }
};
//fetch students attendance record where attendences.date = inputdate 
// attendance.date , clockin , clockout , studentId 
exports.getAllAttendanceByDate = async (req, res) => {
  const { date } = req.query;
  const dateObject = new Date(date);
  try {
    // Ensure date is in YYYY-MM-DD format
    const formattedDate = formatDate(dateObject);

    // Fetch attendance records for all students on the specified date
    const attendanceRecords = await Attendance.find({
      'attendances.date': formattedDate,
    });

    if (!attendanceRecords.length) {
      return res.status(404).json({ message: 'No attendance records found for this date.' });
    }

    // Prepare the response
    const response = attendanceRecords.map(record => ({
      studentId: record.studentId, // Corrected this line
      attendances: record.attendances.filter(att => att.date === formattedDate)
    }));

    return res.status(200).json({ attendanceData: response });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while fetching attendance.' });
  }
};



// New controller method to classify students based on attendance
exports.getAttendanceSummaryForToday = async (req, res) => {
  const { date } = req.query;
  const dateObject = new Date(date);
  const formattedDate = moment(dateObject).format("YYYY-MM-DD");

  try {
    const attendanceRecords = await Attendance.find({
      'attendances.date': formattedDate,
    });

    const summary = {
      onTimeCount: 0,
      absentCount: 0,
      lateArrivals: 0,
      earlyDepartures: 0,
      timeOff: 0,
    };

    if (attendanceRecords.length === 0) {
      return res.status(200).json({ summary });
    }

    attendanceRecords.forEach(record => {
      const todayAttendance = record.attendances.find(att => att.date === formattedDate);

      if (!todayAttendance) return;

      const { clockIn, clockOut } = todayAttendance;

      if (isAbsent(todayAttendance)) {
        summary.absentCount++;
      }
       if (isTimeOff(todayAttendance)) {
        summary.timeOff++;
      } else {
        const clockInTime = new Date(`${formattedDate}T${clockIn}:00`);
        const clockOutTime = clockOut ? new Date(`${formattedDate}T${clockOut}:00`) : null;

        if (isOnTime(todayAttendance, formattedDate)) {
          summary.onTimeCount++;
        } else {
          summary.lateArrivals++;
        }

        if (clockOutTime && isEarlyDeparture(todayAttendance)) {
          summary.earlyDepartures++;
        }
      }
    });

    console.log('Attendance Summary:', summary);
    return res.status(200).json({ summary });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while fetching attendance summary.' });
  }
};





// Delete attendance for a student on a specific date
// exports.deleteAttendanceByDate = async (req, res) => {
//   const { studentId } = req.params;
//   let { date } = req.query;

//   try {
//     // Ensure date is in YYYY-MM-DD format
//     date = formatDate(date);

//     const attendanceRecord = await Attendance.findOne({ studentId });

//     if (!attendanceRecord) {
//       return res.status(404).json({ message: 'No attendance record found for this student.' });
//     }

//     const updatedAttendances = attendanceRecord.attendances.filter(
//       (att) => att.date !== date
//     );

//     if (updatedAttendances.length === attendanceRecord.attendances.length) {
//       return res.status(404).json({ message: 'No attendance record found for the specified date.' });
//     }

//     attendanceRecord.attendances = updatedAttendances;
//     await attendanceRecord.save();

//     return res.status(200).json({ message: 'Attendance record deleted successfully.' });
//   } catch (error) {
//     return res.status(500).json({ error: 'Failed to delete attendance.' });
//   }
// };
