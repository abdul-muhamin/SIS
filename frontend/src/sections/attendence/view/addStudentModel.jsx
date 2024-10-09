import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  Button,
  Dialog,
  TextField,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';

const AddStudentModal = ({ open, onClose }) => {
  const [formValues, setFormValues] = useState({
    date: '',
    clockIn: '',
    clockOut: '',
  });

  const [error, setError] = useState(null);
  const [showClockIn, setShowClockIn] = useState(false);
  const [showClockOut, setShowClockOut] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    if (name === 'date' && value) {
      setShowClockIn(true); // Show clock in when date is set
    }
  };

  const handleClockIn = () => {
    setShowClockOut(true); // Show clock out when clock in is clicked
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        throw new Error('Failed to add student');
      }

      const result = await response.json();
      console.log('Student added successfully:', result);

      // Reset form values
      setFormValues({
        date: '',
        clockIn: '',
        clockOut: '',
      });
      setShowClockIn(false);
      setShowClockOut(false);

      // Close the modal after successful submission
      onClose();
    } catch (err) {
      console.error('Error adding student:', err.message);
      setError(err.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Add Attendance</DialogTitle>
      <DialogContent>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {/* Date Field */}
              <TextField
                fullWidth
                label="Date"
                name="date"
                type="date"
                value={formValues.date}
                onChange={handleChange}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />

              {/* Clock In Field (only shows after date is set) */}
              {showClockIn && (
                <TextField
                  fullWidth
                  label="Clock In"
                  name="clockIn"
                  type="time"
                  value={formValues.clockIn}
                  onChange={handleChange}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onClick={handleClockIn}
                />
              )}

              {/* Clock Out Field (only shows after clock in is clicked) */}
              {showClockOut && (
                <TextField
                  fullWidth
                  label="Clock Out"
                  name="clockOut"
                  type="time"
                  value={formValues.clockOut}
                  onChange={handleChange}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            </Grid>
          </Grid>
        </Box>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Define prop types for validation
AddStudentModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddStudentModal;
