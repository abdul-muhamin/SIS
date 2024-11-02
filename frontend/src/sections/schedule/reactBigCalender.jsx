import moment from "moment";
import React, { useState, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";

import DeleteConfirmationModal from "./deleteModel"; // Your delete modal
import AddEventModal from "./addModel"; // Your add event modal

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function ReactBigCalendar() {
  const [eventsData, setEventsData] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [selectedStart, setSelectedStart] = useState(new Date());
  const [selectedEnd, setSelectedEnd] = useState(new Date());

  // Load events from backend
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.userId;
    fetch(`http://localhost:3001/api/schedule/events/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        const formattedEvents = data.map((event) => ({
          ...event,
          start: moment(event.start).toDate(),
          end: moment(event.end).toDate(),
          startTime: moment(event.start).format("h:mm A"),
          endTime: moment(event.end).format("h:mm A"),
        }));
        setEventsData(formattedEvents);
      })
      .catch((error) => console.error("Error loading events", error));
  }, []);

  // Handle selection of a time slot to create a new event
  const handleSelect = ({ start, end }) => {
    setSelectedStart(start);
    setSelectedEnd(end);
    setIsAddModalOpen(true); // Open the add event modal
  };

  // Function to handle adding a new event
  const handleAddEvent = async (newEvent) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.userId;
    const url= import.meta.env.VITE_APP_URL;

    const eventToPost = { ...newEvent, userId };
    try {
        const response = await fetch(`${url}/api/schedule/events`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(eventToPost),
        });
        if (!response.ok) throw new Error("Failed to create event");

        const createdEvent = await response.json();
        setEventsData((prevEvents) => [
            ...prevEvents,
            {
                ...createdEvent,
                start: moment(createdEvent.start).toDate(),
                end: moment(createdEvent.end).toDate(),
                startTime: moment(createdEvent.start).format("h:mm A"),
                endTime: moment(createdEvent.end).format("h:mm A"),
            },
        ]);
    } catch (error) {
        console.error("Error creating event", error);
    }
};


  // Function to handle event deletion
  const handleDeleteConfirmation = async () => {
    const url= import.meta.env.VITE_APP_URL;
    if (!eventToDelete) return;

    try {
      const response = await fetch(`${url}/api/schedule/events/${eventToDelete._id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete event");

      // Remove the deleted event from state
      setEventsData(eventsData.filter((e) => e._id !== eventToDelete._id));
      setEventToDelete(null); // Clear the event after deletion
    } catch (error) {
      console.error("Error deleting event", error);
    } finally {
      setIsDeleteModalOpen(false); // Close the delete modal
    }
  };

  // Open delete modal
  const openDeleteModal = (event) => {
    setEventToDelete(event);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="App">
      <Calendar
        views={["day", "agenda", "work_week", "month"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="work_week"
        events={eventsData}
        style={{ height: "100vh" }}
        onSelectEvent={openDeleteModal} // Open custom delete modal
        onSelectSlot={handleSelect} // Open add modal on slot select
      />
      <DeleteConfirmationModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)} // Close delete modal
        onProceed={handleDeleteConfirmation} // Proceed with deletion
      />
      <AddEventModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)} // Close add modal
        onAddEvent={handleAddEvent} // Handle adding new event
        selectedStart={selectedStart}
        selectedEnd={selectedEnd}
      />
    </div>
  );
}
