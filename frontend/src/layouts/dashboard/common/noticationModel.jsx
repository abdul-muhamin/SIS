import PropTypes from 'prop-types';
import { useState } from 'react';
import { Box, List, Modal, Button, Divider, Typography, ListItemButton, TablePagination } from '@mui/material';

export default function NotificationsModal({ open, onClose, notifications, setNotifications, setTotalUnRead }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Initial rows per page

  const handleMarkAsRead = async (notificationId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/notification/markAsRead`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notificationId }),
      });
      if (!response.ok) throw new Error('Failed to mark as read');

      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === notificationId
            ? { ...notification, isRead: true, readTime: new Date().toISOString() }
            : notification
        )
      );
      setTotalUnRead((prev) => prev - 1);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="notifications-modal" aria-describedby="modal-with-notifications">
      <Box sx={{ maxWidth: 800,maxHeight:1200, mx: 'auto', mt: 5, bgcolor: 'background.paper', borderRadius: 1, p: 3, boxShadow: 24 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Notifications
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <List>
          {notifications.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((notification) => (
            <Box key={notification._id} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
              <ListItemButton disabled={notification.isRead} sx={{ py: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Typography variant="subtitle2">{notification.message}</Typography>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ ml: 2 }}
                  onClick={() => handleMarkAsRead(notification._id)}
                >
                  Mark as Read
                </Button>
              </ListItemButton>
              <Divider />
            </Box>
          ))}
        </List>
        <TablePagination
          component="div"
          count={notifications.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          sx={{ mt: 2 }}
        />
        <Box sx={{ mt: 2, textAlign: 'left' }}>
          <Button variant="contained" onClick={onClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

NotificationsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired,
  setNotifications: PropTypes.func.isRequired,
  setTotalUnRead: PropTypes.func.isRequired,
};
