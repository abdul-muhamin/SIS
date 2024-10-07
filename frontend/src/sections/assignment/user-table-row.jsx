import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
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
  selected,
  // name,
  // avatarUrl,
  // idNumber,
  // Class,
  title,
  assignment,
  // motherName,
  // Address,
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

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            {/* <Avatar alt={name} src={avatarUrl} /> */}
            <Typography variant="subtitle2" noWrap>
              {title}
            </Typography>
          </Stack>
        </TableCell>
        {/* <TableCell>{idNumber}</TableCell> */}

        {/* <TableCell>{Class}</TableCell> */}
        <TableCell>{assignment}</TableCell>
        {/* <TableCell>{motherName}</TableCell> */}
        {/* <TableCell>{Address}</TableCell> */}

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
        <MenuItem onClick={() => { onEdit(); handleCloseMenu(); }}>Edit</MenuItem>
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
  selected: PropTypes.bool,
  title: PropTypes.string,
  // avatarUrl: PropTypes.string,
  // idNumber: PropTypes.string,
  // Class: PropTypes.string,
  assignment: PropTypes.string,
  // motherName: PropTypes.string,
  // Address: PropTypes.string,
  handleClick: PropTypes.func,
  onEdit: PropTypes.func, // Add prop types for onEdit
  onDelete: PropTypes.func, // Add prop types for onDelete
};
