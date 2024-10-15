import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
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

  // Handle change for form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Handle change for date picker
 // Handle change for date picker
const handleDateChange = async (newDate) => {
  if (!newDate) return;

  // Make sure date is in a Date format
  const formattedDate = new Date(newDate);

  setFormValues((prev) => ({
    ...prev,
    date: formattedDate,
  }));

  // Fetch existing attendance data for the selected date
  const existingAttendance = await fetchAttendanceData(formattedDate.toISOString().split('T')[0]);
  if (existingAttendance) {
    setFormValues({
      ...formValues,
      date: formattedDate,
      clockIn: existingAttendance.clockIn,
      clockOut: existingAttendance.clockOut,
      leaveType: existingAttendance.leaveType,
    });
  } else {
    setFormValues({
      ...formValues,
      date: formattedDate,
      clockIn: '',
      clockOut: '',
      leaveType: '',
    });
  }
};


  // Fetch attendance data from database for the selected date
  const fetchAttendanceData = async (selectedDate) => {
    try {
      const response = await fetch(`http://localhost:3001/api/students/${currentUser._id}/attendance?date=${selectedDate}`);
      
      if (!response.ok) throw new Error('Failed to fetch attendance data');

      const data = await response.json();
      console.log(selectedDate)
      return data;
    } catch (err) {
      console.error(err);
      setError('Error fetching attendance data');
      return null; // Return null in case of an error
    }
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

  // Save attendance data to database
  const handleSave = async () => {
    if (!currentUser || !currentUser._id) {
      setError('No valid user ID found for attendance.');
      return;
    }

    const updatedAttendanceData = {
      date: formValues.date,
      clockIn: formValues.clockIn,
      clockOut: formValues.clockOut,
      leaveType: formValues.leaveType,
    };

    try {
      // Check if the attendance record for this date already exists
      const existingAttendance = await fetchAttendanceData(updatedAttendanceData.date);

      const requestOptions = {
        method: existingAttendance ? 'POST' : 'PUT', // Use PUT if exists, POST otherwise
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAttendanceData),
      };

      // Use only the date in the URL
      const url = existingAttendance
        // ? `http://localhost:3001/api/students/${currentUser._id}/attendance/${updatedAttendanceData.date}`
        // : `http://localhost:3001/api/students/${currentUser._id}/attendance`;
        ? `http://localhost:3001/api/students/${currentUser._id}/attendance`
        : `http://localhost:3001/api/students/${currentUser._id}/attendance/${updatedAttendanceData.date}`;

      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error('Failed to save attendance data');
      }

      setAttendanceData((prev) => ({
        ...prev,
        [currentUser._id]: updatedAttendanceData,
      }));

      setSuccessMessage('Attendance data saved successfully!');
      setError(null);
      onClose();
    } catch (err) {
      console.error('Error saving attendance:', err);
      setError('Failed to save attendance data');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add Attendance for {currentUser?.fullName}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ marginTop: '10px' }}>
            <Grid item xs={12}>
              <DatePicker
                label="Date"
                value={formValues.date ? new Date(formValues.date) : null} // Convert string back to Date object for the picker
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
                <Typography variant="body1" sx={{ color: 'red' }}>
                  Clock In: {formValues.clockIn}
                </Typography>
              </Grid>
            )}
            {formValues.clockOut && (
              <Grid item xs={6}>
                <Typography variant="body1" sx={{ color: 'red' }}>
                  Clock Out: {formValues.clockOut}
                </Typography>
              </Grid>
            )}

            <Grid item xs={6}>
              <Button variant="contained" color="secondary" fullWidth onClick={() => {
                setFormValues({ ...formValues, leaveType: 'Full Leave' });
                setLeaveMessage(`${currentUser.fullName} applied for full leave.`);
              }}>
                Apply Full Leave
              </Button>
            </Grid>

            <Grid item xs={6}>
              <Button variant="contained" color="secondary" fullWidth onClick={() => {
                setFormValues({ ...formValues, leaveType: 'Half Leave' });
                setLeaveMessage(`${currentUser.fullName} applied for half leave.`);
              }}>
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
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
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


// const handleDateChange = async (newDate) => {
//   if (!newDate) return;

//   // Make sure date is in a Date format
//   const formattedDate = new Date(newDate);

//   setFormValues((prev) => ({
//     ...prev,
//     date: formattedDate,
//   }));

//   // Fetch existing attendance data for the selected date
//   const existingAttendance = await fetchAttendanceData(formattedDate.toISOString().split('T')[0]);
//   if (existingAttendance) {
//     setFormValues({
//       ...formValues,
//       date: formattedDate,
//       clockIn: existingAttendance.clockIn,
//       clockOut: existingAttendance.clockOut,
//       leaveType: existingAttendance.leaveType,
//     });
//   } else {
//     setFormValues({
//       ...formValues,
//       date: formattedDate,
//       clockIn: '',
//       clockOut: '',
//       leaveType: '',
//     });
//   }
// };