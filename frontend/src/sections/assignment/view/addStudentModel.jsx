import PropTypes from 'prop-types';
import React, { useState } from 'react';

import {
  Box,
  Dialog,
  Button,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

const AddAssignmentModal = ({ open, onClose }) => {
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleAddAssignment = () => {
    console.log('Assignment message:', message);
    // Add assignment logic here
    onClose(); // Close the modal after submission
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.5rem', textAlign: 'center' }}>
        Add Assignment
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2, mb: 3 }}>
          <TextField
            label="Message"
            placeholder="Enter the assignment details"
            fullWidth
            multiline
            rows={5}
            value={message}
            onChange={handleChange}
            variant="outlined"
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'flex-end', p: 2 }}>
        <Button onClick={onClose} variant="contained" color="error" sx={{ mr: 1 }}>
          Cancel
        </Button>
        <Button onClick={handleAddAssignment} variant="contained" color="primary">
          Add Assignment
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Define prop types for validation
AddAssignmentModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddAssignmentModal;
