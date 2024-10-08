import { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Grid,
  Button,
  Dialog,
  Select,
  MenuItem,
  TextField,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';

const AddStudentModal = ({ open, onClose }) => {
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
    studentId: '',
    status: 'active',
  });

  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

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
      formData.append('studentId', formValues.studentId);
      formData.append('status', formValues.status);
      formData.append('photo', selectedFile);

      const response = await fetch('http://localhost:3001/api/teachers', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to add student');
      }

      const result = await response.json();
      console.log('Student added successfully:', result);

      setFormValues({
        fullName: '',
        email: '',
        class: '',
        idNumber: '',
        fatherName: '',
        motherName: '',
        fatherPhoneNumber: '',
        motherPhoneNumber: '',
        address: '',
        studentId: '',
        status: '',
      });
      setSelectedFile(null);

      onClose();
    } catch (err) {
      console.error('Error adding student:', err.message);
      setError(err.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Add Teacher</DialogTitle>
      <DialogContent>
        <Box>
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
                <TextField name="photo" type="file" onChange={handleFileChange} />
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
                label="Teacher ID"
                name="studentId"
                value={formValues.studentId}
                onChange={handleChange}
                margin="normal"
              />
              <Select
                fullWidth
                label="Status"
                name="status"
                value={formValues.status}
                onChange={handleChange}
                margin="normal"
                displayEmpty
                inputProps={{ 'aria-label': 'Status' }}
              >
                <MenuItem value="" disabled>
                  Select Status
                </MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Banned</MenuItem>
                
              </Select>
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
          Add Teacher
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
