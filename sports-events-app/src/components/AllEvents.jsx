import React from 'react';
import EventCard from './EventCard';

const AllEvents = ({ events, onSelectEvent, selectedEvents }) => {
    return (
        <>
            <div>
                <div>
                    <h2>All Events</h2>
                </div>
                <div className="events-list">
                    {events.map((event) => (
                        <EventCard key={event.id} event={event} onSelectEvent={onSelectEvent} 
                            isSelected={selectedEvents.find(e => e.id === event.id)}/> 
                    ))}
                </div>
            </div>

        </>
    );
};

export default AllEvents;