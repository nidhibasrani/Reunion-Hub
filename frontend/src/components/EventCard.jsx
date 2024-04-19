import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/core";
import { Splide, SplideSlide } from "@splidejs/react-splide";

const EventCard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/user/all-events`
      );
      if (res.status === 200) {
        console.log("events", res.data);
        setEvents(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const truncateDescription = (description) => {
    const words = description.split(" ");
    if (words.length > 15) {
      return words.slice(0, 15).join("") + "...";
    }
    return description;
  };

  return (
    <>
      <div className="event-card-slider w-full mx-auto">
        <Splide
          options={{
            perPage: 3,
            gap: "1rem",
            breakpoints: {
              1024: {
                perPage: 2,
              },
              768: {
                perPage: 1,
              },
            },
          }}
        >
          {events.map((event, index) => (
            <SplideSlide key={index}>
              <div className="event-card border border-gray-300 rounded-lg overflow-hidden">
                <img
                  className="w-full h-48 object-cover"
                  src={import.meta.env.VITE_APP_URL + event?.featuredImage}
                  alt="Event"
                />
                <div className="p-4">
                  <h1 className="text-lg font-medium text-gray-900 mb-2">
                    {event?.title}
                  </h1>
                  <p className="text-sm text-gray-700 mb-4">
                    {truncateDescription(event?.description)}
                  </p>
                  <div className="flex items-center justify-between">
                    <Link
                      to={`/event/${event?._id}`}
                      className="text-blue-500 font-semibold hover:underline"
                    >
                      Learn More
                    </Link>
                    <div className="flex space-x-2 text-gray-500">
                      <svg
                        className="w-4 h-4 stroke-current"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      <span>1.2K</span>
                      <svg
                        className="w-4 h-4 stroke-current"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                      <span>6</span>
                    </div>
                  </div>
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </>
  );
};

export default EventCard;
