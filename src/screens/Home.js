import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Hero from '../images/Hero.png';
import { useNavigate } from 'react-router-dom';

const Home = ({ eventid, title, description, event_posted, onClick }) => {
  // Function to limit words in a string
  const limitWords = (str, limit) => {
    const words = str.split(' ');
    return words.slice(0, limit).join(' ') + (words.length > limit ? '...' : '');
  };

  const limitedDescription = limitWords(description, 10);

    return (
      <>
      <div className='m-2'>
        <div 
          className="relative max-w-sm bg-white border border-gray-200 rounded-md shadow cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
          onClick={onClick}
        >
          <img
            src={Hero}
            alt="Hero Banner"
            className="rounded-t-lg h-auto max-w-full"
          />
          
            <div className="p-3">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{title}</h5>
              <p className="mb-3 font-normal text-gray-700">{limitedDescription}</p>
              <div className='bg-teal-700 text-white rounded-full py-1 px-2 absolute bottom-2 right-2 h-6 md:h-8'>
                <p className='text-xs md:text-sm'>
                  {event_posted}
                </p>
              </div>
              <a href={'viewevent?eventid=' + eventid}/>
            </div>
        </div>
      </div>
      </>
    );
  };

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []); 

  const handleViewEventClick = (eventid) => {
    navigate(`/viewevent/${eventid}`); 
    console.log('indidcheck', eventid)
  };
  
  const rows = [];
  const cardsPerRow = 3;

  for (let i = 0; i < events.length; i += cardsPerRow) {
    const row = events.slice(i, i + cardsPerRow);
    
    rows.push(
      <div key={i / cardsPerRow} className='sm:flex sm:flex-wrap justify-center'>
        {row.map((eventItem, index) => (
          <Home
            key={index}
            title={eventItem.title}
            description={eventItem.description}
            event_posted={eventItem.time_start}
            {...eventItem}
            onClick={ ()=> handleViewEventClick(eventItem.eventid) }
          />
        ))}
      </div>
    );
  }

  return <>{rows}</>;
};

export default EventsList;
