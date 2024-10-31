import React from 'react';
import PropTypes from 'prop-types';

import { Box, Paper, Typography } from '@mui/material';

function UserMessage({ text, children }) {
  return (
    <Box display="flex" justifyContent="flex-end" marginBottom={1}>
      <Paper elevation={3} sx={{ backgroundColor: 'blue', color: 'white', padding: 2, borderRadius: 2 }}>
        <Typography>{text}</Typography>
        {children}
      </Paper>
    </Box>
  );
}

UserMessage.propTypes = {
  text: PropTypes.string,
  children: PropTypes.node,
};

export default UserMessage;
