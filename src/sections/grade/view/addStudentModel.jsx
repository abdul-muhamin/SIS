import React from 'react';
import PropTypes from 'prop-types';

import {
  Table,
  Dialog,
  Button,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

const AddStudentModal = ({ open, onClose }) => {

  const handleSubmit = () => {
    console.log('Form submitted');
    onClose(); // Close the dialog after submission
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Grade</DialogTitle>
      <DialogContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course Name</TableCell>
              <TableCell>Mid</TableCell>
              <TableCell>Final</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {['Math', 'Turkish Language', 'English', 'Physics', 'Chemistry', 'History', 'Geography'].map((course) => (
              <TableRow key={course}>
                <TableCell>{course}</TableCell>
                <TableCell>100</TableCell>
                <TableCell>100</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="error">
          Save
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Edit
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
