import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authAxios from '../axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SingleEvent = () => {
  const [event, setEvent] = useState(null);
  const { id } = useParams();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvent(id);
  }, [id]);

  const fetchEvent = async (id) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/user/event/${id}`);
      if (res.status === 200) {
        console.log(res.data)
        setEvent(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleJoinEvent = async () => {
    if (!isAuthenticated) {
      navigate('/register');
    }
    try {
      const res = await authAxios.post(`/user/participate/${id}`);
      if (res.status === 200) {
        console.log('Event joined successfully');
        toast.success('Event joined successfully');
      }
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error);
    }
  };

  return (
    <div>
      <ToastContainer /> {/* ToastContainer initialized */}
      {event ? (
        <>
          <div className="event-details">
            <h1>{event.title}</h1>
            <p>{event.description}</p>

            <button className='px-2 py-4 bg-blue-700 text-white' onClick={handleJoinEvent}>Join This Event</button>
          </div>


          <h2> Peoples Who are in this Event</h2>
          <ul>
        {event.participants.map(participant => (
          <li key={participant._id}>
            <p>Username: {participant.userName}</p>
           
            {/* Add more participant information as needed */}
          </li>
        ))}
      </ul>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SingleEvent;
