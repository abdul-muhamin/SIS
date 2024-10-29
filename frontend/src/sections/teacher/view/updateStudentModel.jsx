import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import {
  Box,
  Grid,
  Button,
  Dialog,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  DialogTitle,
  FormControl,
  DialogContent,
  DialogActions,
} from '@mui/material';

const UpdateStudentModal = ({ open, onClose, user, onUpdate }) => {
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
    studentId: '',
    photo: '', // Added photo property
    status: '', // Set default status to Active
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
        status: user.status || 'Active',
        studentId: user.studentId || '',
        _id: user._id || '',
        photo: user.photo ? `http://localhost:3001/uploads/${user.photo}` : '',
      });
      setSelectedFile(null);
    }
  }, [user, open]);

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
    formData.append('studentId', formValues.studentId);
    formData.append('_id', formValues._id);

    if (selectedFile) {
      formData.append('photo', selectedFile);
    }

    try {
      const response = await fetch(`http://localhost:3001/api/teachers/${formValues._id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update student');
      }

      const data = await response.json();
      onUpdate(data);
      onClose();
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Update Staff</DialogTitle>
      <DialogContent>
        <Box>
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
                type="email"
                value={formValues.email}
                onChange={handleChange}
                // margin="normal"
                sx={{marginTop:"25px"}}
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

            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <TextField
                  name="photo"
                  type="file"
                  onChange={handleFileChange}
                  sx={{ width: '150px' }}
                />
                <img
                  src={selectedFile ? URL.createObjectURL(selectedFile) : formValues.photo || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUbytATKdWLC03SIFVrlgdmQRk65j7uptVXw&s'}
                  alt="Selected Preview"
                  style={{
                    width: '90px',
        height: '90px',
        borderRadius: '50%',
        objectFit: 'cover',
        border: '5px solid grey'
                  }}
                />
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
                label="Staff ID"
                name="studentId"
                value={formValues.studentId}
                onChange={handleChange}
                margin="normal"
              />
              <FormControl fullWidth sx={{marginTop:"10px"}}>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formValues.status}
                  onChange={handleChange}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Banned">Banned</MenuItem>
                </Select>
              </FormControl>
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

UpdateStudentModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default UpdateStudentModal;
