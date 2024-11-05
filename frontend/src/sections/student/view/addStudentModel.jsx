import PropTypes from 'prop-types';
import QRCode from 'react-qr-code';
import { useState  , useEffect} from 'react';
import { doc, setDoc  } from 'firebase/firestore';
import {createUserWithEmailAndPassword,} from 'firebase/auth';

import {
  Box,
  Grid,
  Button,
  Dialog,
  Select,
  MenuItem,
  TextField,
  Typography,
  InputLabel,
  DialogTitle,
  FormControl,
  DialogActions,
  DialogContent
} from '@mui/material';

import {  db , auth} from 'src/firebase';

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
    qrCode:'',
    studentId: '',
    status: 'Active', // Status field
  });

  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [roles , setRoles] = useState([])
  const [loading, setLoading] = useState(false);
  // const [studentRoleId ,setStudentRoleId] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/roles/getRolesAndPolicies');
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          setRoles(data.roles || []);
        } else {
          throw new Error('Response is not in JSON format');
        }
      } catch (err) {
        console.error('Error fetching roles:', err.message || err);
      }
    };

    fetchRoles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = import.meta.env.VITE_APP_URL;
    setError(null);
    setLoading(true);
  
    try {
      const selectedRole = roles.find((r) => r.roleName === 'STUDENT') || roles[0];
      if (!selectedRole) {
        setError('Please select a valid role');
        setLoading(false);
        return;
      }
  
      const selectedRoleId = selectedRole.roleId;
  
      // Sign up the staff in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, formValues.email, formValues.email);
      const { user } = userCredential;
  
      // Add user data to Firestore with `user.uid` as the document ID
      await setDoc(doc(db, 'users', user.uid), {
        userId: user.uid,
        fullName:formValues.fullName,
        roleId: selectedRoleId,
        role: 'STUDENT',
        email: formValues.email,
        // status: formValues.status || 'Active',
      });
  
      console.log('Staff added successfully with role ID:', selectedRoleId);
      const qrCodeData = `${formValues.email},${formValues.email},${user.uid}`;
      // Add other details to your backend
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
      formData.append('studentId', user.uid);
      formData.append('qrCode', qrCodeData);
      formData.append('status', formValues.status);
      formData.append('photo', selectedFile);
  
      const response = await fetch(`${url}/api/students`, {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Failed to add students');
      }
  
      console.log('students added to backend successfully');
      setFormValues({ ...formValues });
      setSelectedFile(null);
      onClose();
    } catch (err) {
      console.error('Error adding staff:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Add Student</DialogTitle>
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
                sx={{ marginTop: '25px' }}
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formValues.email}
                onChange={handleChange}
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
                  sx={{
                    width: '150px',
                  }}
                />
                <Grid item xs={12} sx={{ textAlign: 'center'}}>
          <QRCode value={formValues.qrCodeData} size={50} />
        </Grid>
                <img
                  src={
                    selectedFile
                      ? URL.createObjectURL(selectedFile)
                      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUbytATKdWLC03SIFVrlgdmQRk65j7uptVXw&s'
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
                label="Student ID"
                name="studentId"
                value={formValues.studentId}
                onChange={handleChange}
                margin="normal"
              />
              <FormControl fullWidth sx={{ marginTop: '10px' }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={formValues.status}
                  name="status"
                  onChange={handleChange}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Banned">Banned</MenuItem>
                </Select>
              </FormControl>
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

AddStudentModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddStudentModal;
