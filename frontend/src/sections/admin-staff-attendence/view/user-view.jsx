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

import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import AddStudentModal from './addStudentModel'; // Import the AddStudentModal
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import UpdateStudentModal from './updateStudentModel'; // Import the UpdateStudentModal
import { applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function UserPage() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [attendanceData, setAttendanceData] = useState({});
  const [open, setOpen] = useState(false);
  // const [currentUser, setCurrentUser] = useState(null);

  // State for users and modals
  const [users, setUsers] = useState([]); // State for storing users
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch users from the API
  const fetchUsers = async () => {
    const url= import.meta.env.VITE_APP_URL;
    try {
      const response = await fetch(`${url}/api/teachers`); // Adjust the URL as necessary
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data); // Assuming your API returns an array of users
      console.log('Fetched Data:', data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch users when the component mounts
  }, []);

  // Delete a user
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
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      fetchUsers(); // Refresh users after deletion
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  // Add Modal Handlers
  const handleOpenAddModal = () => {
    if (selected.length === 1) { 
      setOpenAddModal(true);
    } else {
      setOpenAddModal(false);
    }
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
    fetchUsers(); // Refresh the users after adding a new student
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
        
      });
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      await fetchUsers(); // Refresh the user list after updating
      handleCloseUpdateModal(); // Close the modal after updating
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

  const handleClick = (event, userId) => {
    const selectedIndex = selected.indexOf(userId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, userId);
      const student = users.find(user => user._id === userId);
      setCurrentUser(student);
    } else {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
      if (newSelected.length === 0) {
        setCurrentUser(null);
      } else {
        const student = users.find(user => user._id === newSelected[0]);
        setCurrentUser(student);
      }
    }
    
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

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
        fetch(`${url}/api/teachers/${id}`, {
          method: 'DELETE',
        })
        
      );

      await Promise.all(deleteRequests); // Wait for all delete requests to complete
      setSelected([]); // Clear the selection
      fetchUsers(); // Refresh the user list after deletion
    } catch (error) {
      console.error('Error deleting users:', error);
    }
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && filterName.trim() !== '';


  return (
    <Container sx={{ height: { lg: '60vh' } }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h4">Staff Attendence</Typography>
        <Button
  variant="contained"
  color="inherit"
  startIcon={<Iconify icon="eva:plus-fill" />}
  onClick={handleOpenAddModal}
  disabled={selected.length !== 1} // Disable if no student is selected
>
  Mark Attendence
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
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'idNumber', label: 'Id Number' },
                  // { id: 'date', label: 'Date' },
                  // { id: 'clockIn', label: 'ClockIn' },
                  // { id: 'clockOut', label: 'ClockOut' },
                  { id: 'Class', label: 'Class' },
                  { id: 'fatherName', label: 'Father Name' },
                  { id: 'motherName', label: 'Mother Name' },
                  { id: 'Address', label: 'Address' },
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row._id} // Use studentId as key for unique identification
                      name={row.fullName}
                      row={row}
                      avatarUrl={row?.photoUrl ?? '/default-avatar.jpg'}
                      idNumber={row.idNumber}
                      Class={row.class}
                      // date={row.attendance?.[0]?.date ? new Date(row.attendance[0].date).toLocaleDateString('en-US') : 'No Date'} // Show first attendance date or default
                      // clockIn={row.attendance?.[0]?.clockIn ?? 'No Clock In'} // Show first attendance clock in
                      // clockOut={row.attendance?.[0]?.clockOut ?? 'No Clock Out'}
                      fatherName={row.fatherName}
                      fatherPhoneName={row.fatherPhoneName}
                      motherPhoneName={row.motherPhoneName}
                      motherName={row.motherName}
                      Address={row.address}
                      status={row.status}
                      selected={selected.indexOf(row._id) !== -1} 
                      handleClick={(event) => handleClick(event, row._id)}
                      onEdit={() => handleOpenUpdateModal(row)} // Pass the row data to open the modal for editing
                      onDelete={() => deleteUser(row._id)} // Call deleteUser with studentId
                    />
                  ))}
                <TableEmptyRows height={rowsPerPage - dataFiltered.length} />
                {/* <TableNoData isNotFound={notFound} /> */}
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

      {/* Add Student Modal */}
      <AddStudentModal
       open={openAddModal}
       onClose={handleCloseAddModal}
       currentUser={currentUser} // Pass currentUser to the modal
       attendanceData={attendanceData}
        setAttendanceData={setAttendanceData}
      />

      {/* Update Student Modal */}
      <UpdateStudentModal
        open={openUpdateModal}
        onClose={handleCloseUpdateModal}
        currentUser={currentUser}
        onUpdateUser={handleUpdateUser}
      />
    </Container>
  );
}
