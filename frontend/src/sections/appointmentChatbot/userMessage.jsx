import React from 'react';
import PropTypes from 'prop-types';
import { ChatMessage } from '@chatbotkit/react';

import { Box } from '@mui/material';

export function UserMessage({ text, children, ...props }) {
  return (
    <Box {...props} display="flex" alignItems="flex-end" justifyContent="flex-end" sx={{ gap: 2 }}>
      {text && (
        <ChatMessage
          text={text}
          sx={{ bgcolor: 'primary.main', color: 'white', borderRadius: 2, p: 2, boxShadow: 1 }}
        />
      )}
      {children}
    </Box>
  );
}

UserMessage.propTypes = {
  text: PropTypes.string,
  children: PropTypes.node,
};
