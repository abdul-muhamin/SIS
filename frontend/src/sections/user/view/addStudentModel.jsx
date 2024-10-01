import PropTypes from 'prop-types';
import React, { useState } from 'react';

import {
  Box,
  Grid,
  Button,
  Avatar,
  Dialog,
  TextField,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

const AddStudentModal = ({ open, onClose }) => {
  const [formValues, setFormValues] = useState({
    fullName: '',
    email: '',
    class: '',
    idNumber: '',
    fatherName: '',
    motherName: '',
    fatherPhone: '',
    motherPhone: '',
    address: '',
    studentId: '',
  });

  const [error, setError] = useState(null); // To handle errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // Sending a POST request to your backend API to save student data
      const response = await fetch('http://localhost:3001/api/students', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues), // Send the form values as JSON
      });
  
      if (!response.ok) {
        throw new Error('Failed to add student');
      }
  
      const result = await response.json();
      console.log('Student added successfully:', result);
  
      // Close the modal after successful submission
      onClose();
    } catch (err) {
      console.error('Error adding student:', err.message);
      setError(err.message); // Set error message if something goes wrong
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Add Student</DialogTitle>
      <DialogContent
        sx={{
          padding: 2,
          overflow: 'hidden', // Prevent scrolling
          maxHeight: '500px', // Set a fixed height for the dialog content
        }}
      >
        <Box sx={{ padding: 2 }}>
          <Grid container spacing={1}>
            {/* Left Column */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={formValues.fullName}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formValues.email}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Class"
                name="class"
                value={formValues.class}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="ID Number"
                name="idNumber"
                value={formValues.idNumber}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Father Name"
                name="fatherName"
                value={formValues.fatherName}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Mother Name"
                name="motherName"
                value={formValues.motherName}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>

            {/* Right Column */}
            <Grid item xs={12} md={6}>
              {/* Profile Photo */}
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Avatar
                  sx={{ width: 120, height: 120 }}
                  src="/broken-image.jpg"
                  alt="Student Photo"
                />
              </Box>
              <Typography align="center">Photo</Typography>

              <TextField
                fullWidth
                label="Father Phone Number"
                name="fatherPhone"
                value={formValues.fatherPhone}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Mother Phone Number"
                name="motherPhone"
                value={formValues.motherPhone}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formValues.address}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Student ID"
                name="studentId"
                value={formValues.studentId}
                onChange={handleChange}
                margin="normal"
              />
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
          Add Student
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
