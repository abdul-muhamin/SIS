import React, { useState } from 'react';

import {
  Box,
  Chip,
  Table,
  Paper,
  Button,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  Typography,
  IconButton,
  TableContainer,
  InputAdornment,
  TablePagination
} from '@mui/material';

import Iconify from 'src/components/iconify';  // Replacing MUI icons with Iconify

const users = [
  { name: 'Al Smitham', company: 'Pagac, Lockman and Ondricka', role: 'Front End Developer', verified: 'Yes', status: 'Banned', avatar: 'path/to/avatar1' },
  { name: 'Alice Hintz II', company: 'McDermott - Stamm', role: 'UX Designer', verified: 'No', status: 'Banned', avatar: 'path/to/avatar2' },
  { name: 'Allen Kreiger-Walter', company: 'Jerde - Stokes', role: 'Full Stack Designer', verified: 'No', status: 'Active', avatar: 'path/to/avatar3' },
  { name: 'Bernice Wisozk', company: 'Beer and Sons', role: 'Front End Developer', verified: 'No', status: 'Banned', avatar: 'path/to/avatar4' },
  { name: 'Blanche Cruickshank', company: 'Quigley - Zieme', role: 'Hr Manager', verified: 'No', status: 'Banned', avatar: 'path/to/avatar5' },
];

const AssignmentUserView = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Users</Typography>
        <Button variant="contained" color="primary">
          + New User
        </Button>
      </Box>

      {/* Search bar */}
      <TextField
        variant="outlined"
        placeholder="Search user..."
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {/* Replacing MUI SearchIcon with Iconify */}
              <Iconify icon="eva:search-fill" width={20} height={20} />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <input type="checkbox" />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Verified</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => (
              <TableRow key={index}>
                <TableCell padding="checkbox">
                  <input type="checkbox" />
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Avatar src={user.avatar} sx={{ mr: 2 }} />
                    {user.name}
                  </Box>
                </TableCell>
                <TableCell>{user.company}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.verified}</TableCell>
                <TableCell>
                  {user.status === 'Active' ? (
                    <Chip label="Active" color="success" />
                  ) : (
                    <Chip label="Banned" color="error" />
                  )}
                </TableCell>
                <TableCell>
                  <IconButton>
                    {/* Replacing MUI MoreVertIcon with Iconify */}
                    <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={users.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

export default AssignmentUserView;
