import PropTypes from 'prop-types';
import React, { useState } from 'react';

import {
  Table,
  Dialog,
  Button,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

const AddStudentModal = ({ open, onClose }) => {
  const [courseName, setCourseName] = useState('');
  const [midGrade, setMidGrade] = useState('');
  const [finalGrade, setFinalGrade] = useState('');

  // Handle form submission to save data to the database
  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/grades', {
        method: 'POST',
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
        throw new Error('Failed to save grades');
      }

      const result = await response.json();
      // console.log('Grades saved successfully:', result);

      // Clear input fields after submission
      setCourseName('');
      setMidGrade('');
      setFinalGrade('');

      // Close the dialog after successful submission
      onClose();
    } catch (error) {
      console.error('Error saving grades:', error.message);
    }
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
            <TableRow>
              <TableCell>
                <TextField
                  label="Course Name"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <TextField
                  label="Mid"
                  type="number"
                  value={midGrade}
                  onChange={(e) => setMidGrade(e.target.value)}
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <TextField
                  label="Final"
                  type="number"
                  value={finalGrade}
                  onChange={(e) => setFinalGrade(e.target.value)}
                  fullWidth
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="error">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save
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
