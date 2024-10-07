import { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Grid,
  Button,
  Dialog,
  TextField,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';

const AddStudentModal = ({ open, onClose }) => {
  const [formValues, setFormValues] = useState({
    title: '',
    assignment: '',
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const response = await fetch('http://localhost:3001/api/assignments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        throw new Error('Failed to add assignments');
      }

      const result = await response.json();
      console.log('assignments added successfully:', result);

      setFormValues({
        title: '',
        assignment: '',
      });

      // Close the modal after successful submission
      onClose();
    } catch (err) {
      console.error('Error adding student:', err.message);
      setError(err.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Add Assignments</DialogTitle>
      <DialogContent>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formValues.title}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Assignment"
                name="assignment"
                multiline
                rows={5}
                value={formValues.assignment}
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
          Add Assignment
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
