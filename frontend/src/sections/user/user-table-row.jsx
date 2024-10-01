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

// import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

import DeleteConfirmationModal from './view/deleteModel'; // Import the delete modal

// ----------------------------------------------------------------------

export default function UserTableRow({
  id, // Add id prop here
  selected,
  name,
  avatarUrl,
  idNumber,
  Class,
  fatherName,
  motherName,
  Address,
  handleClick,
  onEdit, // Add onEdit prop
  onDelete, // Add onDelete prop for handling delete
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
      id, // Pass the id when editing
      idNumber, 
      fullName: name, 
      class: Class, 
      fatherName, 
      motherName, 
      address: Address 
    }); // Pass the required student data
    setOpen(true);
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

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={avatarUrl} />
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

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover open={!!open} anchorEl={open} onClose={handleCloseMenu}>
        <MenuItem onClick={handleOpenEditModal}>Edit</MenuItem>
        <MenuItem onClick={handleOpenDeleteModal}>Delete</MenuItem>
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
  id: PropTypes.string, // Add prop type for id
  selected: PropTypes.bool,
  name: PropTypes.string,
  avatarUrl: PropTypes.string,
  idNumber: PropTypes.string,
  Class: PropTypes.string,
  fatherName: PropTypes.string,
  motherName: PropTypes.string,
  Address: PropTypes.string,
  handleClick: PropTypes.func,
  onEdit: PropTypes.func, // Add prop types for onEdit
  onDelete: PropTypes.func, // Add prop types for onDelete
};
