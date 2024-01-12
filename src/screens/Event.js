import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventposted, setEventposted] = useState('');
  const [eventdata, setEventdata] = useState([]);
  const { eventid } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/events/${eventid}`);
        setEventdata(response.data);
      } catch (error) {
        console.error('Error fetching information:', error);
      }
    };

    fetchData();
  }, [eventid]);

  return (
    <div>
      {eventdata.map((eventlist, index) => (
        <div className="container mx-auto p-4" key={index}>
          <h1 className="text-2xl font-bold mb-4">{eventlist.title}</h1>
        </div>
      ))}
    </div>
  );
};

export default ViewEvent;
