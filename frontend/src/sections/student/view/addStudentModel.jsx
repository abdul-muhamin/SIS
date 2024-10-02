import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

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
    status: '',
  });
  const [error, setError] = useState(null); // To handle errors
  // const [selectedImage, setSelectedImage] = useState(null); // State for storing the selected image

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  // useEffect(() => {
  //   getImage();
  // },[]);
  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setSelectedImage(URL.createObjectURL(file)); 
  //   }
  // };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(selectedFile)
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', selectedFile);
  }
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch('http://localhost:3001/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formValues, photo: selectedFile }), // Include the selected image in the request
      });
      const formData = new FormData();
    formData.append("image", selectedFile);

    const imageResutlt = await axios.post(
      "http://localhost:3001/api/students",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log(imageResutlt)

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
      setSelectedFile(null); // Reset selected image

      // Close the modal after successful submission
      onClose();
    } catch (err) {
      console.error('Error adding student:', err.message);
      setError(err.message); // Set error message if something goes wrong
    }
  };
  // const getImage = async () => {
  //   const result = await axios.get("http://localhost:3001/api/students");
  //   console.log(result);
  //   selectedFile(result?.data?.data);
  // };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Add Student</DialogTitle>
      <DialogContent
        sx={{
          overflow: 'hidden', // Prevent scrolling
          maxHeight: '1000px', // Set a fixed height for the dialog content
        }}
      >
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
              <TextField type="file" onChange={handleFileChange} />
              <Button onClick={handleUpload} disabled={!selectedFile}>Upload</Button>
                {selectedFile && (
                  <img
                    src={selectedFile}
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
                label="Student ID"
                name="studentId"
                value={formValues.studentId}
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
