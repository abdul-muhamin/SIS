import React, { useState, useContext } from 'react';
import { ChatInput, ConversationContext } from '@chatbotkit/react';

import { Box, Paper } from '@mui/material';

import BotMessage from './botMessage';
import UserMessage from './userMessage';

export default function ChatArea() {
  const { thinking, text, setText } = useContext(ConversationContext);
  const [messages, setMessages] = useState([]); // Local state for messages

  const handleSubmit = async () => {
    if (!text) return;
  
    // Display the user's message
    const userMessage = { id: Date.now(), type: 'user', text };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
  
    setText(''); // Clear the input
  
    try {
      const response = await fetch("http://localhost:3001/api/chatbot", { // Ensure the endpoint matches
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }), // Ensure 'message' key is correct
      });
  
      if (response.ok) {
        const data = await response.json();
        // Display the bot's response
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: Date.now() + 1, type: 'bot', text: `Thank you, ${data.response.name}! We have your email as ${data.response.email}.` }, // Adjust according to response structure
        ]);
      } else {
        console.error("Failed to fetch bot response", response.statusText);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  
  

  return (
    <Box component={Paper} elevation={3} padding={3} borderRadius={3}>
      <Box display="flex" flexDirection="column" gap={2}>
        {messages
          .filter(({ type }) => ['user', 'bot'].includes(type))
          .map(({ id, type: messageType, text: messageText }) => {
            switch (messageType) {
              case 'user':
                return <UserMessage key={id} text={messageText} />;
              case 'bot':
                return <BotMessage key={id} text={messageText} />;
              default:
                return null;
            }
          })}
        {thinking && <BotMessage key="thinking" text="● ● ●" />}
      </Box>
      <ChatInput
        style={{ marginTop: '16px' }}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onSubmit={handleSubmit}
        placeholder="Your message..."
      />
    </Box>
  );
}
