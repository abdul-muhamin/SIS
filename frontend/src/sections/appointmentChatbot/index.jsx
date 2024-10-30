import React from 'react';
// import Footer from './Footer';
import ConversationManager from '@chatbotkit/react/components/ConversationManager';

import { Container, Typography } from '@mui/material';

import ChatArea from './chatArea';
import { complete } from './complete';

export default function Page() {
  return (
    <ConversationManager endpoint={complete}>
      <Container maxWidth="md" sx={{ py: 10 }}>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Please use the area below to book an appointment with me. My
          intelligent assistant will help you with selecting the right time and
          date for your appointment.
        </Typography>
        <ChatArea />
        {/* <Footer /> */}
      </Container>
    </ConversationManager>
  );
}
