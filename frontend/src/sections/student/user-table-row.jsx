import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';

import DeleteConfirmationModal from './view/deleteModel'; // Import the delete modal


// ----------------------------------------------------------------------

export default function UserTableRow({
  id,
  row,
  selected,
  name,
  // photoUrl,
  idNumber,
  Class,
  fatherName,
  motherName,
  fatherPhoneNumber,
  motherPhoneNumber,
  Address,
  handleClick,
  status,
  onEdit,
  onDelete,
}) {
  const [open, setOpen] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // State to manage delete modal visibility

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleOpenEditModal = () => {
    onEdit({ 
      id, 
      idNumber, 
      fullName: name, 
      class: Class, 
      fatherName, 
      motherName, 
      address: Address ,
      status
    });
    setOpen(null); // Close the menu after opening the edit modal
  };

  const handleOpenDeleteModal = () => {
    setDeleteModalOpen(true);
    handleCloseMenu(); // Close the menu when delete is clicked
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleProceedDelete = () => {
    onDelete(id); // Pass the id when deleting
    setDeleteModalOpen(false); // Close the modal after confirming delete
  };
  const photoUrl = row.photoUrl || '/default-avatar.jpg';
  console.log('Photo URL:', photoUrl);

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar src={photoUrl} /> 
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell>{idNumber}</TableCell>
        <TableCell>{Class}</TableCell>
        <TableCell>{fatherName}</TableCell>
        <TableCell>{motherName}</TableCell>
        <TableCell>{Address}</TableCell>
        <TableCell>{status}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover open={!!open} anchorEl={open} onClose={handleCloseMenu}>
        <MenuItem onClick={handleOpenEditModal}>
        <Iconify icon="solar:pen-bold" sx={{ mr: 1 }} />
        Edit</MenuItem>
        <MenuItem onClick={handleOpenDeleteModal}>
        <Iconify icon="solar:trash-bin-trash-bold" sx={{ mr: 1  }}/>
        Delete</MenuItem>
      </Popover>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        onProceed={handleProceedDelete}
      />
    </>
  );
}

UserTableRow.propTypes = {
  id: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  name: PropTypes.string.isRequired,
  photoUrl: PropTypes.string, // Ensure photoUrl is received as a prop
  row: PropTypes.string, // Ensure photoUrl is received as a prop
  idNumber: PropTypes.string.isRequired,
  Class: PropTypes.string.isRequired,
  fatherName: PropTypes.string.isRequired,
  motherName: PropTypes.string.isRequired,
  fatherPhoneNumber: PropTypes.string.isRequired,
  motherPhoneNumber: PropTypes.string.isRequired,
  Address: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired, // Add prop types for onEdit
  onDelete: PropTypes.func.isRequired, // Add prop types for onDelete
};
