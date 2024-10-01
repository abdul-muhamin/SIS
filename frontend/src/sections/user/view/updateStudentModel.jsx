import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

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

const UpdateStudentModal = ({ open, onClose, user, onUpdateUser }) => {
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
    // Ensure _id is part of the initial state if you are using it for updates
    _id: '',
  });

  useEffect(() => {
    if (user) {
      console.log('User object:', user); // Log user prop
      setFormValues({
        fullName: user.fullName || '',
        email: user.email || '',
        class: user.class || '',
        idNumber: user.idNumber || '',
        fatherName: user.fatherName || '',
        motherName: user.motherName || '',
        fatherPhone: user.fatherPhone || '',
        motherPhone: user.motherPhone || '',
        address: user.address || '',
        // Use _id from the user object
        _id: user._id || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async () => {
    console.log('Form values before submit:', formValues); // Debug log
    if (!formValues._id) {
      console.error('Student ID (_id) is missing'); // Log if _id is missing
      return; // Prevent submission if _id is not set
    }

    try {
      const response = await fetch(`http://localhost:3001/api/students/${formValues._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        throw new Error('Failed to update student');
      }

      const data = await response.json();
      onUpdateUser(data); // Call the parent function to update the user in the list
      onClose(); // Close the dialog after successful submission
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Update Student</DialogTitle>
      <DialogContent sx={{ padding: 2, overflow: 'hidden', maxHeight: '500px' }}>
        <Box sx={{ padding: 2 }}>
          <Grid container spacing={2}>
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
                name="_id"
                value={formValues._id}
                onChange={handleChange}
                margin="normal"
                disabled // Disable this field as it should not be changed by the user
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Define prop types for validation
UpdateStudentModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.object, // Expect user object for initial form values
  onUpdateUser: PropTypes.func.isRequired, // Function to update user in the list
};

export default UpdateStudentModal;
