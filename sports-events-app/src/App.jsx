import React, { useEffect, useState } from 'react';
import './App.css';
import AllEvents from './components/AllEvents';
import SelectedEvents from './components/SelectedEvents';
import mockEvents from './mocks/MockEvents';
function App() {

  const localSavedEvents = () => {
    const savedEvents = localStorage.getItem("selectedEvents");
    return savedEvents ? JSON.parse(savedEvents) : []
  }
  const [selectedEvents, setSelectedEvents] = useState(localSavedEvents());

  // Load saved events from localStorage on initial render
  useEffect(() => {
    localStorage.setItem("selectedEvents", JSON.stringify(selectedEvents));
  }, [selectedEvents]);

  const hasClashingEvents = (newEvent) => {
    return selectedEvents.some(e => {
      const newEventStart = new Date(newEvent.start_time);
      const newEventEnd = new Date(newEvent.end_time);     // Parsing date strings to Date objects

      const eventStart = new Date(e.start_time);
      const eventEnd = new Date(e.end_time);

      // Check if the new event overlaps with any existing event
      return (newEventStart < eventEnd && newEventEnd > eventStart)

    });
  }


  const handleSelectEvent = (_event) => {
    if (selectedEvents.length >= 3) {
      alert('You have reached maximum number of events.');
      return;
    }
    if (hasClashingEvents(_event)) {
      alert('You already have an event in this slot.');
      return;
    }
    setSelectedEvents([...selectedEvents, _event])
  }

  const handleDeselectEvent = (_event) => {
    const updatedSelectedEvents = selectedEvents.filter(e => e.id !== _event.id);
    setSelectedEvents(updatedSelectedEvents);
  }

  
  return (
    <>
      <div className='app-title'>
        <h1>Sports Events Registration</h1>
      </div>
      <div className="app-container">
        <div className="box events-container">
          <AllEvents events={mockEvents} onSelectEvent={handleSelectEvent} selectedEvents={selectedEvents} />

        </div>
        <div className="box selected-events-container">
          <SelectedEvents events={selectedEvents} onDeselectEvent={handleDeselectEvent} />

        </div>
      </div>
    </>

  );
}

export default App;
