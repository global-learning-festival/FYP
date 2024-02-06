import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5';
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react"; 
import "../styles/App.css";
import GoogleButton from "react-google-button";
import { UserAuth } from "../context/AuthContext";

const Home = ({ eventid, title, description, image, formattedDate, location, startTime, endTime, onClick }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [publicId, setPublicId] = useState("");
  const [cloudName] = useState("dxkozpx6g");
  const [bookmarkedEvents, setBookmarkedEvents] = useState([])
  const localhostapi = "http://localhost:5000";
  const serverlessapi = "https://adminilftest.onrender.com";
  const loggedInUserID = localStorage.getItem("loggedInUserID");

  const cld = new Cloudinary({
    cloud: {
      cloudName
    }
  });
  
  useEffect(() => {
    const fetchBookmarkedEvents = async () => {
      try {
        if (loggedInUserID !== null) {
          const response = await axios.get(`${serverlessapi}/saveevents/${loggedInUserID}`);
          setBookmarkedEvents(response.data.rows);

          const isEventBookmarked = response.data.rows.some(savedEvent => savedEvent.eventid === eventid);
          setIsBookmarked(isEventBookmarked);
        } else {
          setIsBookmarked(false);
        }
      } catch (error) {
        console.error('Error fetching bookmarked events:', error);
      }
    };

    fetchBookmarkedEvents();
  }, [eventid, loggedInUserID]);

  const saveevent = async (e) => {
    if (loggedInUserID !== null) {
      e.stopPropagation();

      try {
        const response = await axios.post(`${serverlessapi}/saveevent`, {
          uid: loggedInUserID,
          eventid: eventid
        });

        setIsBookmarked(true);
      } catch (error) {
        console.error('Error adding event:', error);
        alert('please login')
      }
    }
  };

  const deletesave = async (eventid, e) => {
    e.stopPropagation();

    try {
      const response = await axios.delete(`${serverlessapi}/delevent/${loggedInUserID}`, {
        data: { eventid: eventid }
      });
      setIsBookmarked(false);
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const limitWords = (str, limit) => {
    const words = str.split(' ');
    return words.slice(0, limit).join(' ') + (words.length > limit ? '...' : '');
  };

  const limitedDescription = limitWords(description, 5);

  return (
    <>
      <div className='m-2'>
        <div
          className="relative h-full mx-auto max-w-sm bg-white border border-gray-200 rounded-md shadow cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
          onClick={onClick}
        >
          <AdvancedImage
            className="rounded-t-md object-contain w-96 h-36"
            cldImg={cld.image(publicId || image)}
            plugins={[responsive(), placeholder()]}
          />
          <div className="p-3">
            <div className="flex justify-between items-center">
              <h5 className="mb-2 h-12 text-2xl md:text-xl font-bold tracking-tight text-gray-900">{title}</h5>
              {loggedInUserID !== null && (
                <div className='flex flex-col items-end'>
                  {isBookmarked ? (
                    <IoBookmark onClick={(e) => deletesave(eventid, e)} size={24} color="#293262" className="ml-2" />
                  ) : (
                    <IoBookmarkOutline onClick={saveevent} size={24} color="#293262" className="ml-2" />
                  )}
                </div>
              )}
            </div>
            <p className="mb-3 font-normal text-gray-700 underline underline-offset-4">{limitedDescription}</p>
            <div className='flex justify-end'>
            <div className='bg-[#9a4c68] text-white rounded-full mr-0.5 py-1 md:py-1.5 px-2.5 h-6 sm:h-10 lg:h-8'>
                <p className='text-xs md:text-sm'>
                  At {location}
                </p>
              </div>
              <div className='bg-[#293262] text-white rounded-full mr-0.5 py-1 md:py-1.5 px-2.5 h-6 sm:h-10 lg:h-8'>
                <p className='text-xs md:text-sm'>
                  {formattedDate}
                </p>
              </div>
              <div className='bg-[#487572] text-white rounded-full py-1 md:py-1.5 px-2.5 h-6 sm:h-10 lg:h-8'>
                <p className='text-xs md:text-sm'>
                  {startTime} - {endTime}
                </p>
              </div>
            </div>
            <a href={'viewevent?eventid=' + eventid}/>
          </div>
        </div>
      </div>
    </>
  );
};

const FilterBar = ({ currentCategory, setCurrentCategory }) => {
  return (
    <div className="flex justify-center mt-4">
      <button
        className={`mx-2 px-4 py-2 hover:underline ${
          currentCategory === 'All' ? 'text-violet-950 transition border-b-2 border-violet-900 shadow-none' : 'shadow-none'
        }`}
        onClick={() => setCurrentCategory('All')}
      >
        All
      </button>
      <button
        className={`mx-2 px-4 py-2 hover:underline ${
          currentCategory === 'Ongoing' ? 'text-violet-950 transition border-b-2 border-violet-900 shadow-none' : 'shadow-none'
        }`}
        onClick={() => setCurrentCategory('Ongoing')}
      >
        Ongoing
      </button>
      <button
        className={`mx-2 px-4 py-2 hover:underline ${
          currentCategory === 'Saved' ? 'text-violet-950 transition border-b-2 border-violet-900 shadow-none' : 'shadow-none'
        }`}
        onClick={() => setCurrentCategory('Saved')}
      >
        Saved
      </button>
    </div>
  );
};

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [savedEvents, setSavedEvents] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('All');
  const { googleSignIn, user } = UserAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const localhostapi = "http://localhost:5000";
  const serverlessapi = "https://adminilftest.onrender.com";

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`${serverlessapi}/events`);
        setEvents(response.data);

        if (currentCategory === 'Ongoing') {
          const currentDate = new Date().toISOString();
          const filtered = response.data.filter(eventItem => {
            const startTime = new Date(eventItem.time_start);
            const endTime = new Date(eventItem.time_end);
            const currentTime = new Date(currentDate);

            return startTime <= currentTime && currentTime <= endTime;
          });
          setFilteredEvents(filtered);
        } else if (currentCategory === 'Saved') {
          const loggedInUserID = localStorage.getItem("loggedInUserID");

          if (loggedInUserID) {
            const savedResponse = await axios.get(`${serverlessapi}/saveevents/${loggedInUserID}`);
            setSavedEvents(savedResponse.data.rows);

            const savedEventIds = savedResponse.data.rows.map(savedEvent => savedEvent.eventid);
            const savedFiltered = response.data.filter(eventItem => savedEventIds.includes(eventItem.eventid));
            setFilteredEvents(savedFiltered);
          }
        } else {
          setFilteredEvents(response.data);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, [currentCategory]);

  const rows = [];
  const cardsPerRow = 3;

  for (let i = 0; i < filteredEvents.length; i += cardsPerRow) {
    const row = filteredEvents.slice(i, i + cardsPerRow);

    rows.push(
      <div key={i / cardsPerRow} className='sm:flex justify-center'>
        {row.map((eventItem, index) => {
          const startDate = new Date(eventItem.time_start);
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

          const endDate = new Date(eventItem.time_end);
          const endTime = endDate.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            timeZone: 'Asia/Singapore',
          });

          return (
            <Home
              key={index}
              title={eventItem.title}
              description={eventItem.description}
              image={eventItem.image_banner}
              event_start={eventItem.time_start}
              event_end={eventItem.time_end}
              formattedDate={formattedDate}
              startTime={startTime}
              endTime={endTime}
              {...eventItem}
              onClick={() => handleViewEventClick(eventItem.eventid)}
            />
          );
        })}
      </div>
    );
  }

  const handleViewEventClick = (eventid) => {
    navigate(`/viewevent/${eventid}`);
  };

  const loggedInUserID = localStorage.getItem("loggedInUserID");
  return (
    <>
      <FilterBar currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} />
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          {loggedInUserID === null && currentCategory === 'Saved' ? (
            <div className="flex items-center justify-center mt-5">
            <div className="flex flex-col items-center w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
              <h5 className="mb-3 text-xl font-semibold text-gray-900 md:text-xl">
                Save Your Favourite Event!
              </h5>
              <p className="flex flex-col items-center text-center text-md font-normal text-gray-500 dark:text-gray-400">
                Log in to effortlessly save and track the events that you are interested in.
              </p>
              <div className="flex items-center justify-center mt-3">
                <GoogleButton onClick={googleSignIn} />
              </div>
            </div>
          </div>
          ) : (
            rows
          )}
        </>
      )}
    </>
  );
};

export default EventsList;
