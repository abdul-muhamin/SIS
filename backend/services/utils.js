const moment = require('moment');
function isOnTime(attendance , today) {
    const attendanceDate = moment(new Date(attendance.date)).format("YYYY-MM-DD");
    
    // Check if the attendance is for today
    
      // Parse clockIn time
      const clockInTime = new Date(`${attendance.date} ${attendance.clockIn}`);
      
      // Define the time range for On Time (7:45 AM to 8:00 AM)
      const startTime = new Date(`${attendance.date} 07:45 AM`);
      const endTime = new Date(`${attendance.date} 08:00 AM`);
      const isStartTimeGreater = moment(clockInTime).isSameOrAfter(moment(startTime));
      const isClockInTimeLessThanOrEqual = moment(clockInTime).isSameOrBefore(moment(endTime));
      // Check if clockIn is within the On Time range
    if (isStartTimeGreater && isClockInTimeLessThanOrEqual ){return true} else {return false;}

    
     // Not today's attendance
  }
  module.exports={isOnTime}