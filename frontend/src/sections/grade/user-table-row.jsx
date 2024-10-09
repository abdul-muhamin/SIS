import { useState } from 'react';
import PropTypes from 'prop-types';

import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

// import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

import DeleteConfirmationModal from './view/deleteModel'; // Import the delete modal

// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  courseName,
  mid,
  final,
  // grade,
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

  const handleOpenDeleteModal = () => {
    setDeleteModalOpen(true);
    handleCloseMenu(); // Close the menu when delete is clicked
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const handleProceedDelete = () => {
    onDelete(); // Call the delete handler passed from props
    setDeleteModalOpen(false); // Close the modal after confirming delete
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell>{courseName}</TableCell>

        <TableCell>{mid}</TableCell>
        <TableCell>{final}</TableCell>
        {/* <TableCell>{grade}</TableCell> */}

        {/* <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
        </TableCell> */}

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem
          onClick={() => {
            onEdit();
            handleCloseMenu();
          }}
        >
          <Iconify icon="solar:pen-bold" sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleOpenDeleteModal} sx={{ color: 'error.main' }}>
          <Iconify icon="solar:trash-bin-trash-bold" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
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
  selected: PropTypes.bool,
  courseName: PropTypes.string,
  mid: PropTypes.string,
  // grade: PropTypes.string,
  final: PropTypes.string,
  handleClick: PropTypes.func,
  onEdit: PropTypes.func, // Add prop types for onEdit
  onDelete: PropTypes.func, // Add prop types for onDelete
};
