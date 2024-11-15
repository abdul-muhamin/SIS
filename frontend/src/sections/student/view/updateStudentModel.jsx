import PropTypes from 'prop-types';
import QRCode from 'react-qr-code';
// import { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';
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

// const socket1 = io('http://localhost:3001');

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
    studentId: '',
    qrCode: '',
    photo: '', // Added photo property
    status: '', // Set default status to Active
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification , setNotifications] = useState('abc')
  // Load user data when the modal opens
  const socket = io('http://localhost:3001');  




  useEffect(() => {
    if (user) {
      const url = import.meta.env.VITE_APP_URL;
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
        studentId: user.studentId || '',
        status: user.status || 'Active',
        qrCode: user.qrCode || '',
        _id: user._id || '',
        photo: user.photo ? `${url}/uploads/${user.photo}` : '',
      });
      setSelectedFile(null);
      
    }
    // return () => {
    //   socket.disconnect();
    // };
  }, [user, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const url = import.meta.env.VITE_APP_URL;
    const fromUserId = localStorage.getItem('userId');

    if (!fromUserId) {
      console.error('Error: fromUserId not found in localStorage.');
      setIsSubmitting(false);
      return;
    }

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
    formData.append('fromUserId', fromUserId);

    if (selectedFile) {
      formData.append('photo', selectedFile);
    }

    try {
      const response = await fetch(`${url}/api/students/${formValues._id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update student');
      }

      const data = await response.json();
      onUpdateUser(data);
      onClose();

      

      // Emit a notification event to the server with the relevant data
      // const notificationMessage = `${formValues.fullName} has been updated.`;
      // socket1.emit('send_notification', {
      //   fromUserId,
      //   message: notificationMessage,
      // });
      socket.emit("joinRoom", user.studentId , fromUserId);

    } catch (error) {
      console.error('Error updating student:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  
  

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Update Student</DialogTitle>
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
                sx={{ marginTop: '25px' }}
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
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                  <QRCode value={formValues.qrCode} size={50} />
                </Grid>
                <img
                  src={
                    selectedFile
                      ? URL.createObjectURL(selectedFile)
                      : formValues.photo ||
                        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUbytATKdWLC03SIFVrlgdmQRk65j7uptVXw&s'
                  }
                  alt="Selected Preview"
                  style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '5px solid grey',
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
                disabled
                fullWidth
                label="ID"
                name="studentId"
                value={formValues.studentId}
                onChange={handleChange}
                margin="normal"
              />
              <FormControl fullWidth sx={{ marginTop: '10px' }}>
                <InputLabel>Status</InputLabel>
                <Select name="status" value={formValues.status} onChange={handleChange}>
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
  onUpdateUser: PropTypes.func.isRequired,
  // socket: PropTypes.object,
};

export default UpdateStudentModal;
