import PropTypes from 'prop-types';
import React, { useState } from 'react'; // Import PropTypes
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formValues);
    onClose(); // Close the dialog after submission
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Add Student</DialogTitle>
      <DialogContent>
        <Box sx={{ padding: 4 }}>
          <Grid container spacing={2}>
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
                label="Father's Name"
                name="fatherName"
                value={formValues.fatherName}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Mother's Name"
                name="motherName"
                value={formValues.motherName}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>

            {/* Right Column */}
            <Grid item xs={12} md={6}>
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

// Add prop-types validation
AddStudentModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddStudentModal;
