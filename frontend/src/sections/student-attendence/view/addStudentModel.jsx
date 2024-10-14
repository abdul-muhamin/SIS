import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  Grid,
  Button,
  Dialog,
  TextField,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';

const AddStudentModal = ({ open, onClose, currentUser, attendanceData, setAttendanceData }) => {
  const [formValues, setFormValues] = useState({
    date: null,
    clockIn: '',
    clockOut: '',
    leaveType: '',
  });

  const [leaveMessage, setLeaveMessage] = useState(''); 
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(''); 

  // Fetch currentUser's attendance data when modal opens
  useEffect(() => {
    if (open && currentUser) {
      const existingData = attendanceData[currentUser._id] || {};
      setFormValues({
        date: existingData.date || null,
        clockIn: existingData.clockIn || '',
        clockOut: existingData.clockOut || '',
        leaveType: existingData.leaveType || '',
      });
      setError(null);
      setSuccessMessage('');
      setLeaveMessage('');
    }
  }, [currentUser, open, attendanceData]);

  // Handle Clock-In click
  const handleClockIn = async () => {
    if (!formValues.date) {
      setError('Please set the date and time first!');
      return;
    }

    const formattedClockIn = new Date(formValues.date).toLocaleTimeString();
    setFormValues((prev) => ({ ...prev, clockIn: formattedClockIn }));
    setError(null);

    await saveAttendanceData('clockIn', formattedClockIn);
  };

  // Handle Clock-Out click
  const handleClockOut = async () => {
    if (!formValues.clockIn) {
      setError('Please clock in first before clocking out!');
      return;
    }

    const formattedClockOut = new Date(formValues.date).toLocaleTimeString();
    setFormValues((prev) => ({ ...prev, clockOut: formattedClockOut }));
    setError(null);

    await saveAttendanceData('clockOut', formattedClockOut);
  };

  // Handle Apply Full Leave click
  const handleApplyFullLeave = async () => {
    if (!formValues.date) {
      setError('Please set the date first!');
      return;
    }

    setFormValues({ ...formValues, leaveType: 'Full Leave' });
    setLeaveMessage(`${currentUser.fullName} applied for full leave.`);
    setError(null);

    await saveAttendanceData('leaveType', 'Full Leave');
  };

  // Handle Apply Half Leave click
  const handleApplyHalfLeave = async () => {
    if (!formValues.date) {
      setError('Please set the date first!');
      return;
    }

    setFormValues({ ...formValues, leaveType: 'Half Leave' });
    setLeaveMessage(`${currentUser.fullName} applied for half leave.`);
    setError(null);

    await saveAttendanceData('leaveType', 'Half Leave');
  };

  // Save attendance data to database
  const saveAttendanceData = async (key, value) => {
    try {
      const updatedAttendance = {
        ...attendanceData,
        [currentUser._id]: {
          ...formValues,
          [key]: value,
        },
      };
      setAttendanceData(updatedAttendance);

      const response = await fetch(`http://localhost:3001/api/students/${currentUser._id}/attendance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAttendance[currentUser._id]),
      });

      if (!response.ok) {
        throw new Error('Failed to save attendance data');
      }

      setSuccessMessage('Attendance data saved successfully!');
    } catch (err) {
      console.error('Error saving attendance:', err);
      setError('Failed to save attendance data');
    }
  };

  // Handle change for date picker
  const handleDateChange = (newDate) => {
    setFormValues({ ...formValues, date: newDate });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add Attendance for {currentUser?.fullName}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ marginTop: '10px' }}>
            <Grid item xs={12}>
              <DateTimePicker
                label="Date and Time"
                value={formValues.date}
                onChange={handleDateChange}
                renderInput={(props) => <TextField {...props} fullWidth />}
              />
            </Grid>

            <Grid item xs={6}>
              <Button variant="contained" color="primary" fullWidth onClick={handleClockIn}>
                Clock In
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" color="primary" fullWidth onClick={handleClockOut}>
                Clock Out
              </Button>
            </Grid>

            {formValues.clockIn && (
              <Grid item xs={6}>
                <Typography variant="body1" sx={{ color: 'red' }} >Clock In: {formValues.clockIn}</Typography>
              </Grid>
            )}
            {formValues.clockOut && (
              <Grid item xs={6}>
                <Typography variant="body1" sx={{ color: 'red' }}>Clock Out: {formValues.clockOut}</Typography>
              </Grid>
            )}

            <Grid item xs={6}>
              <Button variant="contained" color="secondary" fullWidth onClick={handleApplyFullLeave}>
                Apply Full Leave
              </Button>
            </Grid>

            <Grid item xs={6}>
              <Button variant="contained" color="secondary" fullWidth onClick={handleApplyHalfLeave}>
                Apply Half Leave
              </Button>
            </Grid>

            {leaveMessage && (
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ color: 'blue' }}>
                  {leaveMessage}
                </Typography>
              </Grid>
            )}

            {error && (
              <Grid item xs={12}>
                <Typography variant="body2" color="error">
                  {error}
                </Typography>
              </Grid>
            )}

            {successMessage && (
              <Grid item xs={12}>
                <Typography variant="body2" color="success">
                  {successMessage}
                </Typography>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

AddStudentModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
  attendanceData: PropTypes.object.isRequired,
  setAttendanceData: PropTypes.func.isRequired,
};

export default AddStudentModal;
