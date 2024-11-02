import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { ConversationContext } from '@chatbotkit/react';

import { Box, Button, Typography } from '@mui/material';

export default function SlotSelectionForm({ slots }) {
  const { request } = useContext(ConversationContext);

  // Capture the selected slot
  const captureSlot = (slot) => {
    request('captureSlot', { slot });
  };

  return (
    <Box>
      <Typography variant="body2">Please select an available slot:</Typography>
      <Box display="flex" flexWrap="wrap" gap={1}>
        {slots.map((slot, index) => (
          <Button
            key={index}
            variant="outlined"
            onClick={() => captureSlot(slot.slot)} // Assuming slot has a 'slot' property
          >
            {`${slot.date} at ${slot.time}`} {/* Adjust based on your slot structure */}
          </Button>
        ))}
      </Box>
    </Box>
  );
}

SlotSelectionForm.propTypes = {
  slots: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,  // Assuming the slot structure contains date
      time: PropTypes.string.isRequired,   // Assuming the slot structure contains time
      duration: PropTypes.number,           // Assuming the slot structure contains duration
    })
  ).isRequired,
};
