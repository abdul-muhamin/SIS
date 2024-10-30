import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { ConversationContext } from '@chatbotkit/react';

import { Box, Paper, Typography } from '@mui/material';

export default function SlotSelectionForm({ slots }) {
  const { request } = useContext(ConversationContext);

  const captureSlot = (slot) => {
    request('captureSlot', { slot });
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="body2" color="textSecondary">
        Please select an available slot to book an appointment:
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={2}>
        {slots.map(({ slot }, index) => (
          <Paper
            key={index}
            onClick={() => captureSlot(slot)}
            sx={{
              p: 2,
              cursor: 'pointer',
              transition: '0.3s',
              '&:hover': { boxShadow: 3, transform: 'translateY(-2px)' }
            }}
          >
            {slot}
          </Paper>
        ))}
      </Box>
    </Box>
  );
}

SlotSelectionForm.propTypes = {
  slots: PropTypes.arrayOf(
    PropTypes.shape({
      slot: PropTypes.string.isRequired,
    })
  ).isRequired,
};
