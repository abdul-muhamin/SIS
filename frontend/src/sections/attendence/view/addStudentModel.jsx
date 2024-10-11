import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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
    date: '',
    clockIn: '',
    clockOut: '',
    leaveType: '', // Added field to handle leave type
  });

  const [leaveMessage, setLeaveMessage] = useState(''); // State to hold the leave message
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  // Reset form values when currentUser changes
  useEffect(() => {
    if (open && currentUser) {
      const existingData = attendanceData[currentUser._id] || {};
      setFormValues({
        date: existingData.date || '',
        clockIn: existingData.clockIn || '',
        clockOut: existingData.clockOut || '',
        leaveType: existingData.leaveType || '', // Check if leaveType already exists
      });
      setError(null); // Reset error when opening modal
      setSuccessMessage(''); // Reset success message when opening modal
      setLeaveMessage(''); // Reset leave message
    }
  }, [currentUser, open, attendanceData]);

  // Handle change for form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Handle Clock-In click
  const handleClockIn = () => {
    if (!formValues.date) {
      setError('Please set the date first!');
      return;
    }

    const formattedClockIn = new Date().toLocaleTimeString();
    setFormValues((prev) => ({ ...prev, clockIn: formattedClockIn }));
    setError(null);
  };

  // Handle Clock-Out click
  const handleClockOut = () => {
    if (!formValues.clockIn) {
      setError('Please clock in first before clocking out!');
      return;
    }

    const formattedClockOut = new Date().toLocaleTimeString();
    setFormValues((prev) => ({ ...prev, clockOut: formattedClockOut }));
    setError(null);
  };

  // Handle Save (OK) click
  const handleSave = async () => {
    if (!currentUser || !currentUser._id) {
      setError('No valid user ID found for attendance.');
      return;
    }

    const updatedAttendanceData = {
      ...attendanceData,
      [currentUser._id]: {
        date: formValues.date,
        clockIn: formValues.clockIn,
        clockOut: formValues.clockOut,
        leaveType: formValues.leaveType, // Save the leaveType if present
      },
    };
    setAttendanceData(updatedAttendanceData);

    try {
      const response = await fetch(`http://localhost:3001/api/students/${currentUser._id}/attendance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: formValues.date,
          clockIn: formValues.clockIn,
          clockOut: formValues.clockOut,
          leaveType: formValues.leaveType, // Send the leave type to the database
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save attendance data');
      }

      setSuccessMessage('Attendance and leave saved successfully!');
      setError(null);
      onClose();
    } catch (err) {
      console.error('Error saving attendance:', err);
      setError('Failed to save attendance and leave data');
    }
  };

  // Handle Apply Full Leave click
  const handleApplyFullLeave = () => {
    if (!formValues.date) {
      setError('Please set the date first!');
      return;
    }

    // Set leaveType and the leave message
    setFormValues({ ...formValues, leaveType: 'Full Leave' });
    setLeaveMessage(`${currentUser.fullName} applied for full leave.`);
    setError(null);
  };

  // Handle Apply Half Leave click
  const handleApplyHalfLeave = () => {
    if (!formValues.date) {
      setError('Please set the date first!');
      return;
    }

    // Set leaveType and the leave message
    setFormValues({ ...formValues, leaveType: 'Half Leave' });
    setLeaveMessage(`${currentUser.fullName} applied for half leave.`);
    setError(null);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Attendance for {currentUser?.fullName}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Date"
              name="date"
              type="date"
              fullWidth
              value={formValues.date}
              onChange={handleChange}
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
            <Grid item xs={12}>
              <Typography variant="body1">Clock In: {formValues.clockIn}</Typography>
            </Grid>
          )}
          {formValues.clockOut && (
            <Grid item xs={12}>
              <Typography variant="body1">Clock Out: {formValues.clockOut}</Typography>
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

          <Grid item xs={12}>
            {leaveMessage && (
              <Typography variant="body1" sx={{ color: 'blue' }}>
                {leaveMessage}
              </Typography>
            )}
          </Grid>

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
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
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
