import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import AddStudentModal from './addStudentModel';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import UpdateStudentModal from './updateStudentModel';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function UserPage() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [users, setUsers] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch users from the API
  const fetchUsers = async () => {
    const url= import.meta.env.VITE_APP_URL;
    try {
      const response = await fetch(`${url}/api/teachers`);
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete user
  const deleteUser = async (id) => {
    const url= import.meta.env.VITE_APP_URL;
    if (!id) {
      console.error('Error: user id is undefined');
      return;
    }
    try {
      const response = await fetch(`${url}/api/teachers/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete user');
      fetchUsers();
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  // Add Modal Handlers
  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => {
    setOpenAddModal(false);
    fetchUsers();
  };

  // Update Modal Handlers
  const handleOpenUpdateModal = (user) => {
    setCurrentUser(user);
    setOpenUpdateModal(true);
  };
  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
    setCurrentUser(null);
  };

  // Handle updated user data
  const handleUpdateUser = async (updatedUser) => {
    const url= import.meta.env.VITE_APP_URL;
    try {
      const response = await fetch(`${url}/api/teachers/${updatedUser._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      });
      if (!response.ok) throw new Error('Failed to update user');
      await fetchUsers();
      handleCloseUpdateModal();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Sorting and Filtering Logic
  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value); 
};

  const handleDeleteAll = async () => {
    const url= import.meta.env.VITE_APP_URL;
    try {
      const deleteRequests = selected.map((id) =>
        fetch(`${url}/api/teachers/${id}`, { method: 'DELETE' })
      );
      await Promise.all(deleteRequests);
      setSelected([]);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting users:', error);
    }
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container sx={{ height: { lg: '60vh' } }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4">Staff</Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleOpenAddModal}
        >
          New Staff
        </Button>
      </Stack>

      {/* Table Section */}
      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          onDeleteAll={handleDeleteAll}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'idNumber', label: 'Id Number' },
                  { id: 'Class', label: 'Class' },
                  { id: 'fatherName', label: 'Father Name' },
                  { id: 'motherName', label: 'Mother Name' },
                  { id: 'Address', label: 'Address' },
                  // { id: 'studentId', label: 'Staff ID' },
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row._id}
                      name={row.fullName}
                      row={row}
                      avatarUrl={row?.photoUrl ?? '/default-avatar.jpg'}
                      idNumber={row.idNumber}
                      Class={row.class}
                      fatherName={row.fatherName}
                      fatherPhoneName={row.fatherPhoneName}
                      motherPhoneName={row.motherPhoneName}
                      motherName={row.motherName}
                      Address={row.address}
                      studentId={row.studentId}
                      status={row.status}
                      selected={selected.indexOf(row._id) !== -1} // Check if this row is selected
                      handleClick={(event) => handleClick(event, row._id)} // Toggle selection on checkbox click
                      onEdit={() => handleOpenUpdateModal(row)}
                      onDelete={() => deleteUser(row._id)}
                    />
                  ))}
                <TableEmptyRows height={77} emptyRows={emptyRows(page, rowsPerPage, users.length)} />
                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      {/* Modals */}
      <AddStudentModal open={openAddModal} onClose={handleCloseAddModal} />
      <UpdateStudentModal
        open={openUpdateModal}
        onClose={handleCloseUpdateModal}
        user={currentUser}
        onUpdate={handleUpdateUser}
      />
    </Container>
  );
}
