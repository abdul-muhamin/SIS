import PropTypes from 'prop-types';
import { io } from 'socket.io-client';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import Nav from './nav';
import Main from './main';
import Header from './header';

export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState([]);

  useEffect(() => {
    // Initialize socket connection
    const socket = io('http://localhost:3001');
    const userId = "brUOSt0kicagu7aJMO0lbvaWawB3";
    // Log when connected
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    // Listen for the 'following_chat_message' event from the server
    socket.on(userId, (message) => {
      console.log('send_notification:', message);
      setSnackbarMessage(message); // Set the received message
      setOpenSnackbar(true);       // Open the Snackbar to display it
    });

    socket.on('send_notification', (message) => {
      console.log('send_notification:', message.message);
      setSnackbarMessage(message.message); // Set the received message
      setOpenSnackbar(true);       // Open the Snackbar to display it
    });



    socket.on('student_added', (message) => {
      console.log('student_added:', message.message);
      setSnackbarMessage(message.message); // Set the received message
      setOpenSnackbar(true);       // Open the Snackbar to display it
    });


    socket.on('student_attendance', (message) => {
      console.log('student_attendance:', message.message);
      setSnackbarMessage(message.message); // Set the received message
      setOpenSnackbar(true);       // Open the Snackbar to display it
    });

    // Send a test message to the server
    socket.emit('chat_message', 'Message from client to server');

    // Clean up the event listeners on component unmount
    return () => {
      socket.off('connect');
      socket.off('send_notification');
      socket.off('student_added');
      socket.disconnect();
    };
  }, []);

  // Handle Snackbar close
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />
        <Main>{children}</Main>
      </Box>

      {/* Snackbar to display messages at the bottom-right corner */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} // Position: bottom-right
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{
            width: '100%',
            backgroundColor: '#abf7b1',  // Green background color
            color: 'black',            // Black text color
          }}
        >
          {snackbarMessage || 'Default message for testing'}
        </Alert>
      </Snackbar>
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
