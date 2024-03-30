import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard'; 

const Event = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/user/all-events`);
      if (res.status === 200) {
        console.log('events', res.data);
        setEvents(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {events.map((event, index) => (
        <EventCard key={index} event={event} />
      ))}
    </div>
  );
};

export default Event;
