import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import {
  Box,
  Grid,
  Button,
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
    fatherPhoneNumber: '',
    motherPhoneNumber: '',
    address: '',
    _id: '',
    photo: '', // Added photo property
  });

  const [selectedFile, setSelectedFile] = useState(null);

  // Load user data when the modal opens
  useEffect(() => {
    if (user) {
      setFormValues({
        fullName: user.fullName || '',
        email: user.email || '',
        class: user.class || '',
        idNumber: user.idNumber || '',
        fatherName: user.fatherName || '',
        motherName: user.motherName || '',
        fatherPhoneNumber: user.fatherPhoneNumber || '',
        motherPhoneNumber: user.motherPhoneNumber || '',
        address: user.address || '',
        status: user.status || '',
        _id: user._id || '',
        photo: user.photo ? `http://localhost:3001/uploads/${user.photo}` : '', // Set existing photo URL
      });
      setSelectedFile(null); // Reset selected file when user changes
    }
  }, [user, open]); // Depend on both user and open to reset when modal opens

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('fullName', formValues.fullName);
    formData.append('email', formValues.email);
    formData.append('class', formValues.class);
    formData.append('idNumber', formValues.idNumber);
    formData.append('fatherName', formValues.fatherName);
    formData.append('motherName', formValues.motherName);
    formData.append('fatherPhoneNumber', formValues.fatherPhoneNumber);
    formData.append('motherPhoneNumber', formValues.motherPhoneNumber);
    formData.append('address', formValues.address);
    formData.append('status', formValues.status);
    formData.append('_id', formValues._id);

    if (selectedFile) {
      formData.append('photo', selectedFile); // Add the selected file
    }

    try {
      const response = await fetch(`http://localhost:3001/api/students/${formValues._id}`, {
        method: 'PUT',
        body: formData, // Use FormData for the update request
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
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Display existing photo if available */}
                {formValues.photo && !selectedFile && (
                  <img
                    src={formValues.photo} // Display the existing photo
                    alt="Existing"
                    style={{ marginTop: '10px', width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                )}
                {/* Input for file upload */}
                <TextField name="photo" type="file" onChange={handleFileChange} />
                {/* Display selected photo if a new file has been chosen */}
                {selectedFile && (
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="Selected Preview"
                    style={{ marginTop: '10px', width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                )}
                <Typography align="center">Photo</Typography>
              </Box>

              <TextField
                fullWidth
                label="Father Phone Number"
                name="fatherPhoneNumber"
                value={formValues.fatherPhoneNumber}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Mother Phone Number"
                name="motherPhoneNumber"
                value={formValues.motherPhoneNumber}
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
                label="Status"
                name="status"
                value={formValues.status}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                sx={{ display: "none" }}
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
