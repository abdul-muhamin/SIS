
import React from 'react';
import { ChatBotKit } from '@chatbotkit/sdk';
import { streamComplete } from '@chatbotkit/react/actions/complete';

import SlowSelectionForm from './slotSelection';
import CaptureDetailsForm from './captureDetailForm';

const chatBotKitConfig = new ChatBotKit({
    secret: import.meta.env.REACT_APP_CHATBOTKIT_API_SECRET,
  });
export async function complete({ messages }) {
    debugger
  return streamComplete({
    client: chatBotKitConfig.conversation,
    backstory: `You are a virtual assistant helping with calendar bookings for Dr. Smith...`, // Adjusted backstory for brevity
    model: 'gpt-3.5-turbo', // Specify the model you are using
    messages,
    functions: [
      {
        name: 'getCalendarEvents',
        description: 'Get a list of the current calendar events.',
        parameters: {},
        handler: async () => {
          // Fetch the calendar events from your backend
          const response = await fetch('http://localhost:3001/api/appointment/chat'); // Adjust the URL according to your backend
          debugger
          if (!response.ok) {
            throw new Error('Failed to fetch calendar events');
          }
          const calendar = await response.json(); // Assuming your backend returns a JSON response
          console.log("calender:", calendar)
          return {
            result: {
              status: 'success',
              data: {
                calendar,
              },
            },
          };
        },
      },
      {
        name: 'showSlotSelectionForm',
        description: 'Show slots selection form for booking an appointment.',
        parameters: {
          type: 'object',
          properties: {
            slots: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  slot: {
                    type: 'string',
                    description: 'A string representing the day plus time and duration of the slot.',
                  },
                },
                required: ['slot'],
              },
            },
          },
          required: ['slots'],
        },
        handler: async ({ slots }, { controllers }) => {
          controllers.continuation.abort();

          return {
            children: <SlowSelectionForm slots={slots} />,
            result: {
              status: 'waiting for user input',
            },
          };
        },
      },
      {
        name: 'captureSlot',
        description: 'Capture the slot for booking an appointment.',
        parameters: {
          type: 'object',
          properties: {
            slot: {
              type: 'string',
              description: 'String representing day, time, and duration.',
            },
          },
          required: ['slot'],
        },
        handler: async ({ slot }) => ({
          result: {
            status: slot ? 'success' : 'failure',
            data: {
              slot,
            },
          },
        }),
      },
      {
        name: 'showContactDetailsForm',
        description: 'Shows a form to capture the name and email of the person booking the appointment.',
        parameters: {},
        handler: async (_, { controllers }) => {
          controllers.continuation.abort();

          return {
            children: <CaptureDetailsForm />,
            result: {
              status: 'waiting for user input',
            },
          };
        },
      },
      {
        name: 'captureDetails',
        description: 'Capture the name and email of the person booking the appointment.',
        parameters: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
            },
            email: {
              type: 'string',
            },
          },
          required: ['name', 'email'],
        },
        handler: async ({ name, email }) => ({
          result: {
            status: name && email ? 'success' : 'failure',
            data: {
              name,
              email,
            },
          },
        }),
      },
      {
        name: 'bookAppointment',
        description: 'Book the appointment.',
        parameters: {
          type: 'object',
          properties: {
            date: {
              type: 'string',
            },
            time: {
              type: 'string',
            },
            duration: {
              type: 'number',
            },
            name: {
              type: 'string',
            },
            email: {
              type: 'string',
            },
          },
          required: ['date', 'time', 'duration', 'name', 'email'],
        },
        handler: async ({ date, time, duration, name, email }) => {
          // Prepare the data for your backend
          const appointmentData = { date, time, duration, name, email };

          // Send the appointment data to your backend
          const response = await fetch('http://localhost:3001/api/appointment/chat/book', { // Adjust the URL according to your backend
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(appointmentData),
          });

          if (!response.ok) {
            return {
              result: {
                status: 'failure',
                error: 'Failed to book appointment.',
              },
            };
          }

          const data = await response.json(); // Assuming your backend returns the booked appointment details

          return {
            result: {
              status: 'success',
              data,
            },
          };
        },
      },
    ],
  });
}
