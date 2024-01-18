import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from '../images/Hero.png';
import MapDetail from '../components/mapdetail';
import { useParams } from 'react-router-dom';

const ViewEvent = () => {
  const [eventdata, setEventdata] = useState([]);
  const { eventid } = useParams();
  const localhostapi= "http://localhost:5000"
  const serverlessapi ="https://fyp-9bxz.onrender.com" 
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${serverlessapi}/events/${eventid}`);
        setEventdata(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching information:', error);
      }
    };

    fetchData();
  }, [eventid]);

  // Check if eventdata has any elements before accessing properties
  if (eventdata.length === 0) {
    return <div>Loading...</div>; // You might want to show a loading state or handle this case differently
  }

  // To format timing to be more readable
  const startDate = new Date(eventdata[0].time_start);
  const endDate = new Date(eventdata[0].time_end);

  const formattedDate = startDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone: 'Asia/Singapore',
  });

  const startTime = startDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'Asia/Singapore',
  });

  const endTime = endDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'Asia/Singapore',
  });

  return (
    <div>
      <img
            src={Hero}
            alt="Hero Banner"
            className="h-auto max-w-full mb-3"
          />

      <FilterBar />

       {currentCategory === 'Information' && (
        <div>
          {eventdata.map((eventItem, index) => (
              <div className="container mx-auto p-4" key={index}>
              <h1 className="text-2xl font-bold mb-4">Title: {eventItem.title}</h1>
              <p className="mb-3 font-normal text-gray-700">
                Date: {formattedDate}
              </p>
              <p className="mb-3 font-normal text-gray-700">
                Time: {startTime} - {endTime}
              </p>
              <p className="mb-3 font-normal text-gray-700">Location: {eventItem.location}</p>
              <p className="mb-3 font-normal text-gray-700">Keynote Speaker: {eventItem.keynote_speaker}</p>
              <p className="mb-3 font-normal text-gray-700">Description: {eventItem.description}</p>

              {/* <MapDetail className="max-h-2" /> */}

              <div className="container mx-auto p-4 text-center">
                <h1 className="text-2xl font-bold mb-4">We Need your Feedback!</h1>
                <p className="mb-3 font-normal text-gray-700">
                  If you have attended this event, your feedback will be much appreciated
                </p>
                <button
                href={eventItem.survey_link} target="_blank" rel="noopener noreferrer"
                  className='text-white  bg-[#0077B5] font-medium rounded-md text-sm px-5 py-2.5 hover:bg-[#3A426C] hover:drop-shadow-xl'
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  Survey Link
                </button>
              </div>
            </div>
            ))}
          </div>
          )}

      {currentCategory === 'Announcements' && (
        <div>
          {/* Render content specific to 'Announcements' category */}
          {/* You can customize this section based on your requirements */}
          <h2>Announcements Content</h2>
          <p>{/* Add announcements-specific content here */}</p>
        </div>
      )}

    </div>
  );
};

export default ViewEvent;
