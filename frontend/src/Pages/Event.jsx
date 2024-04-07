import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';

const Event = () => {
  const [events, setEvents] = useState([]);
  const apiUrl = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${apiUrl}/user/all-events`);
      if (res.status === 200) {
        // console.log('Events:', res.data);
        setEvents(res.data);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  return (
    <div className="event-container">
      <h2 className="section-title text-center my-10 text-3xl font-extrabold montserrat">Upcoming Events</h2>
      <div className="event-list">
       
          <EventCard  />
   
      </div>
    </div>
  );
};

export default Event;
