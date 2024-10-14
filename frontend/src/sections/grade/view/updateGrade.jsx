import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import {
  Dialog,
  Button,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

const UpdateStudentModal = ({ open, onClose, user, onUpdateUser }) => {
  const [courseName, setCourseName] = useState('');
  const [midGrade, setMidGrade] = useState('');
  const [finalGrade, setFinalGrade] = useState('');

  // Set state when the modal opens
  useEffect(() => {
    if (user) {
      setCourseName(user.courseName); // Assuming the user object has a 'course' property
      setMidGrade(user.mid); // Assuming the user object has a 'mids' property
      setFinalGrade(user.final); // Assuming the user object has a 'final' property
    }
  }, [user]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/grades/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseName,
          mid: midGrade,
          final: finalGrade,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update grades');
      }

      const result = await response.json();
      // console.log('Grades updated successfully:', result);
      onUpdateUser(result); // Call the parent update function
      onClose(); // Close the modal after updating
    } catch (error) {
      console.error('Error updating grades:', error.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Update Grade</DialogTitle>
      <DialogContent>
        <TextField
          label="Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          fullWidth
          margin="normal" // Add margin to separate fields
        />
        <TextField
          label="Mid"
          type="number"
          value={midGrade}
          onChange={(e) => setMidGrade(e.target.value)}
          fullWidth
          margin="normal" // Add margin to separate fields
        />
        <TextField
          label="Final"
          type="number"
          value={finalGrade}
          onChange={(e) => setFinalGrade(e.target.value)}
          fullWidth
          margin="normal" // Add margin to separate fields
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="error">
          Cancel
        </Button>
        <Button onClick={handleUpdate} variant="contained" color="primary">
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
  user: PropTypes.object,
  onUpdateUser: PropTypes.func.isRequired, // Ensure this prop is required
};

export default UpdateStudentModal;
