import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AnnouncementScreen = () => {
  const [announcementdata, setAnnouncementdata] = useState([]);
  const { announcementid } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/events/${announcementid}`);
        setAnnouncementdata(response.data);
      } catch (error) {
        console.error('Error fetching information:', error);
      }
    };

    fetchData();
  }, [announcementid]);

  return (
    <div>
      {announcementdata.map((announcementlist, index) => (
        <div className="container mx-auto p-4" key={index}>
          <h1 className="text-2xl font-bold mb-4">{announcementlist.title}</h1>
        </div>
      ))}
    </div>
  );
};

export default AnnouncementScreen;
