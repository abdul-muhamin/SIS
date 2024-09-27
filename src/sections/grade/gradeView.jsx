import React from 'react';

import {
  Table, Paper, Button, TableRow, TableBody, TableCell, TableHead, TableContainer,
} from '@mui/material';

import AddAssignmentTopBar from '../assignment/addAssignmentTopBar';

const GradeTable = () => {
  const grades = [
    { course: 'Math', mid: 100, final: 100 },
    { course: 'Turkish Language', mid: 100, final: 100 },
    { course: 'English', mid: 100, final: 100 },
    { course: 'Physics', mid: 100, final: 100 },
    { course: 'Chemistry', mid: 100, final: 100 },
    { course: 'History', mid: 100, final: 100 },
    { course: 'Geography', mid: 100, final: 100 },
  ];

  return (
    <>
    <AddAssignmentTopBar/>
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1 style={{ color: '#7c3aed', fontSize: '2rem', fontWeight: 'bold' }}>Grade</h1>
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course</TableCell>
              <TableCell align="right">Mid</TableCell>
              <TableCell align="right">Final</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {grades.map((grade) => (
              <TableRow key={grade.course}>
                <TableCell component="th" scope="row">
                  {grade.course}
                </TableCell>
                <TableCell align="right">{grade.mid}</TableCell>
                <TableCell align="right">{grade.final}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ marginTop: '20px' }}>
        <Button
          variant="contained"
          style={{ backgroundColor: '#6c63ff', marginRight: '10px' }}
        >
          Save
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: '#ff5c5c' }}
        >
          Edit
        </Button>
      </div>
    </div>
    </>
  );
};

export default GradeTable;
