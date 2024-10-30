// CaptureDetailsForm.js
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { ConversationContext } from '@chatbotkit/react';

import { Box, Button, TextField, Typography } from '@mui/material';

export default function CaptureDetailsForm({ events }) {
  const { request } = useContext(ConversationContext);
  const API_BASE_URL = 'http://localhost:3001/api/appointment/chat'; // Adjust the URL according to your backend

  const bookAppointment = async (appointmentData) => {
    try {
      const response = await fetch(API_BASE_URL, { // Use the correct API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Specify the content type
        },
        body: JSON.stringify(appointmentData), // Convert the data to JSON
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok ${  response.statusText}`); // Handle HTTP errors
      }

      const data = await response.json(); // Parse JSON response
      return data; // Return the booked appointment data
    } catch (error) {
      console.error('Error booking appointment:', error);
      throw error; // Rethrow to handle it in the calling function
    }
  };

  const captureDetails = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;

    try {
      // Assuming you want to book an appointment right after capturing details.
      const result = await bookAppointment({ name, email }); // Call your API function

      if (result.status === 'success') {
        request('captureDetails', { name, email });
      } else {
        console.error('Booking failed:', result);
        // Optionally show a message to the user here
      }
    } catch (error) {
      console.error('Error during booking:', error);
      // Optionally show a message to the user here
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} maxWidth={400}>
      <Typography variant="body2" color="text.secondary"> {/* Updated color */}
        Please provide your name and email to book an appointment:
      </Typography>
      <form onSubmit={captureDetails}>
        <TextField name="name" label="Name" variant="outlined" fullWidth required />
        <TextField name="email" label="Email" variant="outlined" fullWidth required />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Book Appointment
        </Button>
      </form>
    </Box>
  );
}

CaptureDetailsForm.propTypes = {
  events: PropTypes.array,
};
