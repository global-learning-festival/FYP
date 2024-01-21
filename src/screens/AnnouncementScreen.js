import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const AnnouncementScreen = () => {
  const [announcementdata, setAnnouncementdata] = useState([]);
  const { announcementid } = useParams();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const localhostapi = "http://localhost:5000";
  const serverlessapi = "https://fyp-9bxz.onrender.com";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${serverlessapi}/announcements/${announcementid}`);
        setAnnouncementdata(response.data);
      } catch (error) {
        console.error('Error fetching information:', error);
      }
    };

    fetchData();
  }, [announcementid]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div>
      {announcementdata.map((announcementItem, index) => (
        <div className="container mx-auto p-4" key={index}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            onClick={handleGoBack}
            className="text-grey hover:text-[#4B558A] cursor-pointer text-2xl mb-4"
          />
          <h1 className="text-2xl font-bold mb-4">{announcementItem.title}</h1>
          <div className='inline-block bg-teal-700 text-white rounded-full py-1 px-2 right-2 h-6 md:h-8'>
            <p className='text-xs md:text-sm'>
              {announcementItem.created_at === announcementItem.updated_at
                ? `${announcementItem.created_on}`
                : `${announcementItem.updated_on}`}
            </p>
          </div>
          {announcementItem.image && (
            <img
              src={require(`../images/${announcementItem.image}`)}
              alt={`Image for ${announcementItem.title}`}
              className="h-auto max-w-full my-4"
            />
          )}
          <p className='text-xs md:text-sm my-4'>{announcementItem.description}</p>
        </div>
      ))}
    </div>
  );
};

export default AnnouncementScreen;
