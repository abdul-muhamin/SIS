import React, { useState } from 'react';
import { Button, Grid, Typography, Paper, Tooltip, Dialog, DialogContent } from '@mui/material';
import { format } from 'date-fns';
import QRCode from 'react-qr-code';

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
    const currentUser = '67168e9a41b5d7c4e1c24e46';
    try {
      const response = await fetch(`http://localhost:3001/api/students/${currentUser}/attendance`, {
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
    setIsClockInDisabled(true); // Disable Clock In button

    // Save clock-in data along with any existing clock-out time
    await saveAttendanceData({ clockIn: formattedClockIn, clockOut: clockOutTime });
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
    setIsClockOutDisabled(true); // Disable Clock Out button

    // Save clock-out data along with any existing clock-in time
    await saveAttendanceData({ clockIn: clockInTime, clockOut: formattedClockOut });
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
            <Button
              fullWidth
              variant="contained"
              color="success"
              onClick={handleClockIn}
              disabled={isClockInDisabled}
            >
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
            <Button
              fullWidth
              variant="contained"
              color="error"
              onClick={handleClockOut}
              disabled={isClockOutDisabled}
            >
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
