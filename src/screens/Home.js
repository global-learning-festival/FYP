import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Hero from '../images/Hero.png'

const Home = ({ title, description, event_posted }) => {
  // Function to limit words in a string
  const limitWords = (str, limit) => {
    const words = str.split(' ');
    return words.slice(0, limit).join(' ') + (words.length > limit ? '...' : '');
  };

  const limitedDescription = limitWords(description, 10);

    return (
      <>
      <div className='m-2'>
        <div className="relative max-w-sm bg-white border border-gray-200 rounded-md shadow cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
          <img
            src={Hero}
            alt="Hero Banner"
            className="rounded-t-lg h-auto max-w-full"
          />
          
            <div class="p-3">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{title}</h5>
              <p class="mb-3 font-normal text-gray-700">{limitedDescription}</p>
              <div className='bg-teal-700 text-white rounded-full py-1 px-2 absolute bottom-2 right-2 h-6 md:h-8'>
                <p className='text-xs md:text-sm'>
                  {event_posted}
                </p>
              </div>
            </div>
        </div>
      </div>
      </>
    );
  };

const EventsList = () => {
  const [events, setEvents] = useState([]);

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
  
  const rows = [];
  const cardsPerRow = 3;

  for (let i = 0; i < events.length; i += cardsPerRow) {
    const row = events.slice(i, i + cardsPerRow);
    rows.push(
      <div key={i / cardsPerRow} className='sm:flex sm:flex-wrap justify-center'>
        {row.map((events, index) => (
          <Home
            key={index}
            title={events.title}
            description={events.description}
            event_posted={events.time_start}
          />
        ))}
      </div>
    );
  }

  return <>{rows}</>;
};

export default EventsList;
