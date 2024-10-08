import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react'; // Import PropTypes
import {
  Dialog,
  Button,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

const UpdateStudentModal = ({ open, onClose, user, onUpdateUser, assignmentId }) => {
  const [formData, setFormData] = useState({
    title: '',
    assignment: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        title: user.title || '',
        assignment: user.assignment || '',
        // Add other fields as necessary
      });
    }
  }, [user]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (assignmentId) {
      const updatedUser = { ...formData, _id: assignmentId }; // Use the assignmentId here
      onUpdateUser(updatedUser); // Call the handler with updated user data
    } else {
      console.error('No assignment ID provided');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Assignment</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          <TextField
            margin="dense"
            name="assignment"
            label="Discription"
            type="text"
            fullWidth
            multiline
                rows={5}
            variant="outlined"
            value={formData.assignment}
            onChange={handleInputChange}
            required
          />
          {/* Add other fields as necessary */}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button type="submit" color="primary" onClick={handleSubmit}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Prop Types validation
UpdateStudentModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.shape({
    title: PropTypes.string,
    assignment: PropTypes.string,
    // Add other fields as necessary
  }),
  onUpdateUser: PropTypes.func.isRequired,
  assignmentId: PropTypes.string,
};

export default UpdateStudentModal;
