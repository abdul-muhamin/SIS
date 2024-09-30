import React, { useState } from 'react';

import {
  Box,
  Grid,
  Button,
  Avatar,
  TextField,
  Typography,
} from '@mui/material';

export default function UpdateStudentView() {
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
    // Form submission logic here
    console.log('Form submitted:', formValues);
  };

  return (
    <Box sx={{ padding: 4 , height: '100px'}}>
      <Typography variant="h4" color="primary" gutterBottom>
        Add Student
      </Typography>

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
          <Box sx={{ display: 'flex', justifyContent: 'center', }}>
            <Avatar
              sx={{ width: 120 , height: 120 }}
              src="/broken-image.jpg"
              alt="Student Photo"
            />
          </Box>
          <Typography align="center" >Photo</Typography>

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
        <Grid item xs={12} sx={{ textAlign: 'space-between' , marginTop:4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ marginRight: 2, paddingRight: 4 , paddingLeft:4, paddingTop:1, paddingBottom:1}}
          >
            Update
          </Button>
          <Button sx={{ paddingRight: 4 , paddingLeft:4, paddingTop:1, paddingBottom:1}} variant="outlined" color="secondary">
            Cancel
          </Button>
        </Grid>
        </Grid>

        
      </Grid>
    </Box>
  );
}
