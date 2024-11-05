import { format } from 'date-fns';
import QRCode from 'react-qr-code';
import React, { useState } from 'react';

import { Grid, Paper, Button, Dialog, Tooltip, Typography, DialogContent } from '@mui/material';

function StudentDashboard() {
  const [clockInTime, setClockInTime] = useState(null);
  const [clockOutTime, setClockOutTime] = useState(null);
  const [leaveStatus, setLeaveStatus] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [isClockInDisabled, setIsClockInDisabled] = useState(false);
  const [isClockOutDisabled, setIsClockOutDisabled] = useState(false);


  const currentDate = format(new Date(), 'yyyy-MM-dd'); // Format date as YYYY-MM-DD

  // API call to save attendance data
  const saveAttendanceData = async (data) => {
    const url= import.meta.env.VITE_APP_URL;
    const currentUser = '6716a417b7ffb4aef7e8f964';
    try {
      const response = await fetch(`${url}/api/teachers/${currentUser}/teacherAttendance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date: currentDate, ...data }), // Include date in the data payload
      });

      if (!response.ok) {
        throw new Error('Failed to save attendance data');
      }

      setSuccessMessage('Attendance data saved successfully!');
      setError(null); // Clear any previous error
    } catch (err) {
      console.error('Error saving attendance:', err);
      setError('Failed to save attendance data');
      setSuccessMessage(''); // Clear any previous success message
    }
  };

  // Clock In handler
  const handleClockIn = async () => {
    const now = new Date();
    const formattedClockIn = format(now, 'hh:mm a'); // Format clock-in time as hh:mm a
    setClockInTime(formattedClockIn);

    // Save clock-in data along with any existing clock-out time
    await saveAttendanceData({ clockIn: formattedClockIn, clockOut: clockOutTime });
    setIsClockInDisabled(true); // Disable Clock In button after clicking
  };

  // Clock Out handler
  const handleClockOut = async () => {
    if (!clockInTime) {
      setError('Please clock in first before clocking out!');
      return;
    }
    const now = new Date();
    const formattedClockOut = format(now, 'hh:mm a'); // Format clock-out time as hh:mm a
    setClockOutTime(formattedClockOut);

    // Save clock-out data along with any existing clock-in time
    await saveAttendanceData({ clockIn: clockInTime, clockOut: formattedClockOut });
    setIsClockOutDisabled(true); // Disable Clock Out button after clicking
  };

  // Leave handler
  const handleLeave = async (type) => {
    if (!clockInTime && !clockOutTime) {
      setError('Please clock in or clock out first!');
      return;
    }

    const leaveType = type === 'half' ? 'Half Leave Applied' : 'Full Leave Applied';
    setLeaveStatus(leaveType);
    await saveAttendanceData({ leaveType, clockIn: clockInTime, clockOut: clockOutTime });
  };

  // QR code dialog handlers
  const handleShowQR = () => setShowQR(true);
  const handleCloseQR = () => setShowQR(false);

  return (
    <Paper elevation={3} sx={{ p: 4, textAlign: 'center', maxWidth: 500, margin: 'auto', mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Staff Attendance
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {/* Clock In and Clock Out Row */}
        <Grid item xs={6}>
          <Tooltip title="Record your clock-in time">
            <Button fullWidth variant="contained" color="success" onClick={handleClockIn} disabled={isClockInDisabled}>
              Clock In
            </Button>
          </Tooltip>
          {clockInTime && (
            <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'gray' }}>
              Last Clocked In: {clockInTime}
            </Typography>
          )}
        </Grid>

        <Grid item xs={6}>
          <Tooltip title="Record your clock-out time">
            <Button fullWidth variant="contained" color="error" onClick={handleClockOut} disabled={isClockOutDisabled}>
              Clock Out
            </Button>
          </Tooltip>
          {clockOutTime && (
            <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'gray' }}>
              Last Clocked Out: {clockOutTime}
            </Typography>
          )}
        </Grid>

        {/* Leave Application Row */}
        <Grid item xs={6}>
          <Tooltip title="Apply for a half-day leave">
            <Button fullWidth variant="contained" color="primary" onClick={() => handleLeave('half')}>
              Apply Half Leave
            </Button>
          </Tooltip>
        </Grid>

        <Grid item xs={6}>
          <Tooltip title="Apply for a full-day leave">
            <Button fullWidth variant="contained" color="primary" onClick={() => handleLeave('full')}>
              Apply Full Leave
            </Button>
          </Tooltip>
        </Grid>

        {leaveStatus && (
          <Grid item xs={12}>
            <Typography variant="caption" sx={{ color: 'gray' }}>
              {leaveStatus}
            </Typography>
          </Grid>
        )}

        {/* QR and Work Report Row */}
        <Grid item xs={6}>
          <Tooltip title="Scan QR code">
            <Button fullWidth variant="contained" color="primary" onClick={handleShowQR}>
              QR
            </Button>
          </Tooltip>
        </Grid>

        <Grid item xs={6}>
          <Tooltip title="View your work report">
            <Button fullWidth variant="contained" color="primary">
              View Work Report
            </Button>
          </Tooltip>
        </Grid>
      </Grid>

      {/* QR Code Dialog */}
      <Dialog open={showQR} onClose={handleCloseQR}>
        <DialogContent sx={{ textAlign: 'center' }}>
          <QRCode value="https://example.com/student-dashboard" size={150} />
        </DialogContent>
      </Dialog>

      {/* Error and Success Messages */}
      {error && (
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      {successMessage && (
        <Typography variant="body2" color="success" sx={{ mt: 2 }}>
          {successMessage}
        </Typography>
      )}
    </Paper>
  );
}

export default StudentDashboard;
