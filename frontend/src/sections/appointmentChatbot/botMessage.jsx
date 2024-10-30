import React from 'react';
import PropTypes from 'prop-types';
import { ChatMessage } from '@chatbotkit/react';

import { Box } from '@mui/material';

export default function BotMessage({ text, children, ...props }) {
  return (
    <Box display="flex" alignItems="flex-end" {...props}>
      {text ? (
        <ChatMessage
          text={text}
          className="bg-white rounded-lg shadow-md p-4 prose"
        />
      ) : null}
      {children}
    </Box>
  );
}

BotMessage.propTypes = {
  text: PropTypes.string,
  children: PropTypes.node,
};
