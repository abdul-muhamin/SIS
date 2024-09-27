import React, { useState } from 'react';

import {
  Box,
  Grid,
  Table,
  Paper,
  Button,
  Dialog,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableContainer,
} from '@mui/material';

const initialStudents = [
  { id: '2341421', name: 'Ahmed Rashdan' },
  { id: '3411421', name: 'Ali Alhamdan' },
  { id: '2341121', name: 'Mona Alghafar' },
  { id: '2341421', name: 'Moustafa Adel' },
  { id: '2341421', name: 'Jhon Neleson' },
  { id: '2341421', name: 'Kadi Manela' },
];

const AdminView = () => {
  const [students, setStudents] = useState(initialStudents);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editName, setEditName] = useState('');

  // Handle Delete
  const handleDelete = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  // Open Dialog for Update
  const handleUpdate = (student) => {
    setSelectedStudent(student);
    setEditName(student.name);
    setOpenDialog(true);
  };

  // Confirm Update
  const handleConfirmUpdate = () => {
    setStudents(students.map(student =>
      student.id === selectedStudent.id ? { ...student, name: editName } : student
    ));
    setOpenDialog(false);
    setSelectedStudent(null);
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Title and Search Bar */}
      <Grid container justifyContent="start" alignItems="center" spacing={2}>
        <Grid item>
          <Typography variant="h6">Student List</Typography>
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            placeholder="Quick Search..."
            InputProps={{
              startAdornment: (
                <span role="img" aria-label="search">
                  🔍
                </span>
              ),
            }}
            size="small"
          />
        </Grid>
      </Grid>

      {/* Student Table */}
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Student</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: '#7B61FF', mr: 2 }}
                    onClick={() => handleUpdate(student)}
                  >
                    View And Update
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: '#FF5F56' }}
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="caption">Page 1 of 100</Typography>
      </Box>

      {/* Update Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Update Student</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleConfirmUpdate} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminView;
