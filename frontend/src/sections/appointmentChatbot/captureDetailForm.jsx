import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { ConversationContext } from '@chatbotkit/react';

import { Box, Button, TextField, Typography } from '@mui/material';

export default function CaptureDetailsForm({events}) {
  const { request } = useContext(ConversationContext);

  const captureDetails = () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    request('captureDetails', { name, email });
  };

  return (
    <Box>
      <Typography variant="body2">Please provide your name and email:</Typography>
      <TextField id="name" label="Name" fullWidth margin="dense" />
      <TextField id="email" label="Email" type="email" fullWidth margin="dense" />
      <Button variant="contained" onClick={captureDetails} color="primary">
        Book Appointment
      </Button>
    </Box>
  );
}

CaptureDetailsForm.propTypes = {
  events: PropTypes.array,
};
