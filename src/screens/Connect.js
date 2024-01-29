import React, { useEffect, useState } from 'react';
import AllUsersList from './AllUsersList'
import QRCodeGenerator from './QrCodeGenerator'
import QRCodeVerifier from './QrCodeScanner'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Connect = () => {
  const [userData, setUserData] = useState(null);
  const loggedInUserID = localStorage.getItem("loggedInUserID");
  const [loading, setLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('All');
  const rows = [];

  return (
    <>
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          {loggedInUserID === null ? (
            <div className="flex items-center justify-center mt-5">
            <div className="flex flex-col items-center w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
              <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl">
                Connect With Others
              </h5>
              <p className="flex flex-col items-center text-center text-sm font-normal text-gray-500 dark:text-gray-400">
                Network with Guest Speakers and other Attendees of the International Learning Festival!
              </p>
              <div className="text-center text-red-500 mt-4">
              Please login to view saved events.
            </div>
            </div>
          </div>
          ) : (
            rows
          )}
          
        </>
      )}
      <>
      {loggedInUserID !== null && (
      <FilterBar currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} />
      )}
      </>
      
    </>
    
  );
};

const FilterBar = ({ currentCategory, setCurrentCategory, loggedInUserID }) => {
  return (
    <div className="mt-4">
      {loggedInUserID !== null && (
      <>
      <div className="flex justify-center"><button
        className={`mx-2 px-4 py-2 ${
          currentCategory === 'All Users' ? 'text-violet-950 transition border-b-2 border-violet-900 shadow-none' : 'shadow-none'
        }`}
        onClick={() => setCurrentCategory('All Users')}
      >
        All Users
      </button>
      <button
        className={`mx-2 px-4 py-2 ${
          currentCategory === 'My QR Code' ? 'text-violet-950 transition border-b-2 border-violet-900 shadow-none' : 'shadow-none'
        }`}
        onClick={() => setCurrentCategory('My QR Code')}
      >
        My QR Code
      </button>
      <button
        className={`mx-2 px-4 py-2 ${
          currentCategory === 'QR Code Scanner' ? 'text-violet-950 transition border-b-2 border-violet-900 shadow-none' : 'shadow-none'
        }`}
        onClick={() => setCurrentCategory('QR Code Scanner')}
      >
        QR Code Scanner
      </button>
      </div>
      <div>
      {currentCategory === 'All Users' && <AllUsersList />}
      </div>
      <div>
      {currentCategory === 'My QR Code' && <QRCodeGenerator />}
      </div>
      <div>
      {currentCategory === 'QR Code Scanner' && <QRCodeVerifier />}
      </div>
      </>
          )}
          
    </div>
  );
};

export default Connect;
