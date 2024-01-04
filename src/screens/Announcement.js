import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Announcement = ({ title, description, announcement_posted, announcement_updated }) => {
  return (
    <div className='block mx-4 max-w-sm p-6 bg-white border border-gray-200 rounded-md shadow'>
      <h5 className='mb-2 text-2xl font-bold tracking-tight text-black'>{title}</h5>
      <p className='font-normal text-gray-500'>{description}</p>
      <p className='text-sm text-gray-400 mt-2'>
        {announcement_posted === announcement_updated
          ? `Posted on: ${announcement_posted}`
          : `Updated on: ${announcement_updated}`}
      </p>
    </div>
  );
};

const AnnouncementList = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get('http://localhost:5000/announcements');
        setAnnouncements(response.data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    fetchAnnouncements();
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  const rows = [];
  const cardsPerRow = 3;

  for (let i = 0; i < announcements.length; i += cardsPerRow) {
    const row = announcements.slice(i, i + cardsPerRow);
    rows.push(
      <div key={i / cardsPerRow} className='flex justify-center mt-5'>
        {row.map((announcement, index) => (
          <Announcement
            key={index}
            title={announcement.title}
            description={announcement.description}
            announcement_posted={announcement.created_on}  // Add this line
            announcement_updated={announcement.updated_on}  // Add this line
          />
        ))}
      </div>
    );
  }

  return <>{rows}</>;
};

export default AnnouncementList;
