
// controllers/chatbotController.js

const Calendar = require('../models/appointment');

async function handleMessages(req, res) {
    
  const { messages } = req.body;""
  if (!messages || messages.length === 0) {
    return res.status(400).json({ status: 'error', message: 'No messages provided' });
  }

  // Initialize the response
  const response = { status: 'success', data: null };

  // Example backstory (you can adjust the logic here)
  const backstory = `
    You are a virtual assistant that help with managing calendar bookings with Dr. Smith.

Today's date is 2024-03-01.

RULES:
- Always great the user by explaining your purpose.
- Only book appointments between 11am and 5pm.
- Ensure that Dr. Smith has at least 30 minutes between appointments.
- Dr. Smith can only have a maximum of 3 appointments per day.
- Dr. Smith can only have a maximum of 5 appointments per week.
- Dr. Smith can only have a maximum of 10 appointments per month.
- Each appointment is 30 minutes long.
- Only show up-to 4 available slots at a time.
- You can only book appointments 1 month in advance.
- Do not disclose Dr. Smith's calendar to the user, only show available slots.
- Be brief and to the point.
- Do not ask for unnecessary information or repeat yourself.

STEPS:
1. Great the user by explaining your purpose if you haven't done so already.
2. Try to find a suitable slot for booking an appointment.
 - Use the getCalendar function to get a list of the current calendar events.
 - Describe the calendar events to the user.
 - Use the showSlotSelectionForm function to show available slots for booking an appointment.
3. Ensure that the new appointment is within the rules.
4. Capture the name and email of the person booking the appointment with the capture details form.
5. Finally book the appointment.
6. Explain the appointment details to the user.
7. Warn that a confirmation email will be sent to the user.

You have acccess to a number of UI functions to help you with getting information from the user. These function start with the prefix "show". The UI functions will display and interactive form to the user where user input is expected. Akways use these functions to get the required information from the user.

Failure to follow these rules will result in a decline of the appointment and customer dissatisfaction.
  `;

  // Retrieve calendar events from MongoDB
  const calendarEvents = await Calendar.find();
  response.data = {
    backstory,
    calendar: calendarEvents,
  };

  return res.status(200).json(response);
}

async function bookAppointment(req, res) {
  const { date, time, duration } = req.body;

  try {
    // Create a new appointment
    const newAppointment = new Calendar({ date, time, duration });
    await newAppointment.save();

    return res.status(201).json({ status: 'success', data: newAppointment });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
}

module.exports = { handleMessages, bookAppointment };
