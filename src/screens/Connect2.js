import React, { useEffect, useState } from 'react';
import LinkedIn from '../components/Linkedin'; // Import LinkedIn component directly
import { useLinkedinAuth } from '../context/LinkedinAuthContext'; // Import useLinkedinAuth hook
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests

const Connect2 = ({ code }) => {

  const localhostapi = "http://localhost:5000";
  const serverlessapi = "https://fyp-9bxz.onrender.com";
  // Example React component method or useEffect
  const handleLinkedInRedirect = () => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      // Send this code to your backend
      fetch(`${serverlessapi}/linkedin/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
        .then(response => response.json())
        .then(data => {
          // Handle the data from the backend (e.g., access token)
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  };

  return (
    <>
      <div className="flex items-center justify-center mt-5">
        <div className="flex flex-col items-center w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl">
            Connect With Others
          </h5>
          <p className="flex flex-col items-center text-center text-sm font-normal text-gray-500 dark:text-gray-400">
            Network with Guest Speakers and other Attendees of the International Learning Festival!
          </p>
          <LinkedIn />
        </div>
      </div>
    </>
  );
};

export default Connect2;
