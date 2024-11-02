import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react'; // Import PropTypes
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import {
  Grid,
  Dialog,
  Button,
  TextField,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
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

  const handleClockIn = async () => {
    if (!formValues.date) {
      setError('Please set the date and time first!');
      return;
    }

    const formattedClockIn = new Date(formValues.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setFormValues((prev) => ({ ...prev, clockIn: formattedClockIn }));
    setError(null);

    await saveAttendanceData('clockIn', formattedClockIn);
  };

  const handleClockOut = async () => {
    if (!formValues.clockIn) {
      setError('Please clock in first before clocking out!');
      return;
    }

    const formattedClockOut = new Date(formValues.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setFormValues((prev) => ({ ...prev, clockOut: formattedClockOut }));
    setError(null);

    await saveAttendanceData('clockOut', formattedClockOut);
  };

  const handleApplyFullLeave = async () => {
    if (!formValues.date) {
      setError('Please set the date first!');
      return;
    }

    setFormValues({ ...formValues, leaveType: 'FULL_LEAVE' });
    setLeaveMessage(`${currentUser.fullName} applied for full leave.`);
    setError(null);

    await saveAttendanceData('leaveType', 'FULL_LEAVE');
  };

  const handleApplyHalfLeave = async () => {
    if (!formValues.date) {
      setError('Please set the date first!');
      return;
    }

    setFormValues({ ...formValues, leaveType: 'HALF_LEAVE' });
    setLeaveMessage(`${currentUser.fullName} applied for half leave.`);
    setError(null);

    await saveAttendanceData('leaveType', 'HALF_LEAVE');
  };

  const saveAttendanceData = async (key, value) => {
    const url =import.meta.env.VITE_APP_URL;
    try {
      const updatedAttendance = {
        ...attendanceData,
        [currentUser._id]: {
          ...formValues,
          [key]: value,
        },
      };
      setAttendanceData(updatedAttendance);

      const response = await fetch(`${url}/api/students/${currentUser._id}/attendance`, {
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

//   const handleDateChange = (newDate) => {
//     setFormValues({ ...formValues, date: newDate });
//   };
const handleDateChange = async (newDate) => {
  const url =import.meta.env.VITE_APP_URL;
    setFormValues({ ...formValues, date: newDate });
  
    
    if (newDate) {
      try {
        
        const response = await fetch(`${url}/api/students/${currentUser._id}/attendance?date=${newDate.toISOString()}`);
        
        // Parse the response JSON
        const data = await response.json();
  
        
        if (data) {
          setFormValues((prev) => ({
            ...prev,
            clockIn: data.clockIn || '',
            clockOut: data.clockOut || '',
            leaveType: data.leaveType || '',
          }));
        } else {
          
          setFormValues((prev) => ({
            ...prev,
            clockIn: '',
            clockOut: '',
            leaveType: '',
          }));
        }
      } catch (err) {
        console.error('Error fetching attendance data:', err);
        setError('Failed to fetch attendance data');
      }
    }
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

        {/* Buttons for Clock In and Clock Out */}
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

        {/* Display Clock In and Clock Out times conditionally */}
        {formValues.clockIn && !formValues.clockOut ? (
          <Grid item xs={12}>
            {/* Full width Clock In if Clock Out is not clicked */}
            <Typography variant="body1" sx={{ color: 'green' }}>
              Clock In: {formValues.clockIn}
            </Typography>
          </Grid>
        ) : (
          <>
            {/* Split Clock In and Clock Out evenly when both are clicked */}
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ color: 'green' }}>
                Clock In: {formValues.clockIn}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ color: 'red' }}>
                Clock Out: {formValues.clockOut}
              </Typography>
            </Grid>
          </>
        )}

        {/* Apply Full and Half Leave */}
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

        {/* Leave Message */}
        {leaveMessage && (
          <Grid item xs={12}>
            <Typography variant="body1" sx={{ color: 'blue' }}>
              {leaveMessage}
            </Typography>
          </Grid>
        )}

        {/* Error and Success Messages */}
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

// PropTypes validation
AddStudentModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
  }).isRequired,
  attendanceData: PropTypes.object.isRequired,
  setAttendanceData: PropTypes.func.isRequired,
};

export default AddStudentModal;
