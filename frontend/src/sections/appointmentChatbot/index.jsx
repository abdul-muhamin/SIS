import React from 'react';
import ConversationManager from '@chatbotkit/react/components/ConversationManager';

import { Container, Typography } from '@mui/material';

import ChatArea from './chatArea';

export default function Page() {
  return (
    <ConversationManager endpoint="http://localhost:3001/api/chatbot">
      <Container maxWidth="md" sx={{ py: 10 }}>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Please use the area below to book an appointment with me. My intelligent assistant will help you with selecting the right time and date for your appointment.
        </Typography>
        <ChatArea />
      </Container>
    </ConversationManager>
  );
}
