import React from "react";
import { Link } from "react-router-dom";


const EventCard = ({ event}) => {
  return (
    <div className="event-card">
      <div>
        <img src={import.meta.env.VITE_APP_URL + event?.featuredImage} width={400} height={300} alt={event?.heading} />
      </div>
      <div>
        <h1>{event?.title}</h1>
        <p className="text-xs">{event?.description}</p>
      </div>
      <button><Link to={`/event/${event?._id}`}>Go to this Event</Link></button>
    </div>
  );
};

export default EventCard;
