import React, { useContext } from 'react';
import { ChatInput, ConversationContext } from '@chatbotkit/react';

import { Box } from '@mui/material';

import BotMessage from './botMessage';
import { UserMessage } from './userMessage';

export default function ChatArea() {
  const { thinking, text, setText, message, messages, submit } = useContext(ConversationContext);

  return (
    <Box borderRadius={2} p={4} display="flex" flexDirection="column" gap={2} boxShadow={2}>
      {messages.length > 0 && (
        <Box display="flex" flexDirection="column" gap={2}>
          {messages
            .filter(({ type }) => ['user', 'bot'].includes(type))
            .map(({ id, type, text: messageText, children }, index) => (
              type === 'user' ? (
                <UserMessage key={id} text={messageText} />
              ) : (
                <BotMessage key={id} text={messageText}>{children}</BotMessage>
              )
            ))}
          {message && <BotMessage key={message.id} text={message.text} />}
          {thinking && <BotMessage key="thinking" text="● ● ●" />}
        </Box>
      )}
      <ChatInput
        value={text}
        onChange={(e) => setText(e.target.value)}
        onSubmit={submit}
        placeholder="Your message..."
        sx={{
          borderRadius: 1,
          bgcolor: 'background.paper',
          p: 1.5,
          '&:focus-within': { boxShadow: 3 }
        }}
      />
    </Box>
  );
}
