import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import {
  Dialog,
  Button,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';

export default function AddEventModal({ open, onClose, onAddEvent, selectedStart, selectedEnd }) {
  const [eventName, setEventName] = useState(''); // State for event name input
  const [eventDetails, setEventDetails] = useState(''); // State for additional details

  useEffect(() => {
    // Reset fields when the modal opens
    if (open) {
      setEventName(''); // Clear the input field for event name
      setEventDetails(''); // Clear the input field for event details
    }
  }, [open]);

  const handleAddEvent = () => {
    if (!eventName) return; // Ensure event name is provided

    const newEvent = {
      title: eventName, // Use the event name from the input field
      details: eventDetails, // Additional details (if any)
      start: moment(selectedStart).toISOString(),
      end: moment(selectedEnd).toISOString(),
    };
    onAddEvent(newEvent); // Pass the new event to the parent component
    onClose(); // Close modal after adding event
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="add-event-dialog-title"
      aria-describedby="add-event-dialog-description"
    >
      <DialogTitle id="add-event-dialog-title">Add New Schedule</DialogTitle>
      <DialogContent>
      <DialogContentText id="add-event-dialog-description">
      From <strong>{moment(selectedStart).format('YYYY-MM-DD')}</strong> {moment(selectedStart).format('h:mm A ')} 
         To <strong>{moment(selectedEnd).format('YYYY-MM-DD')}</strong> {moment(selectedEnd).format('h:mm A')}
       </DialogContentText>

        
        {/* Input for Event Title */}
        <TextField
          autoFocus
          margin="dense"
          label="Schedule Title"
          type="text"
          multiline
          fullWidth
          variant="outlined"
          value={eventName} // Bind event name state
          onChange={(e) => setEventName(e.target.value)} // Update state on input change
          placeholder="Enter Schedule Title"
        />
        
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAddEvent} color="error" autoFocus disabled={!eventName}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AddEventModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddEvent: PropTypes.func.isRequired,
  selectedStart: PropTypes.instanceOf(Date).isRequired,
  selectedEnd: PropTypes.instanceOf(Date).isRequired,
};
