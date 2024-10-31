import React from 'react';
import PropTypes from 'prop-types';

import { Box, Paper, Typography } from '@mui/material';

function BotMessage({ text, children }) {
  return (
    <Box display="flex" justifyContent="flex-start" marginBottom={1}>
      <Paper elevation={3} sx={{ backgroundColor: 'white', color: 'black', padding: 2, borderRadius: 2 }}>
        <Typography>{text}</Typography>
        {children}
      </Paper>
    </Box>
  );
}

BotMessage.propTypes = {
  text: PropTypes.string,
  children: PropTypes.node,
};

export default BotMessage;
