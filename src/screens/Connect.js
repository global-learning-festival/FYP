import React, { useEffect, useState } from 'react';
import LinkedIn from '../components/Linkedin'; // Import LinkedIn component directly
import { useLinkedinAuth } from '../context/LinkedinAuthContext'; // Import useLinkedinAuth hook
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests

const Connect = ({ code }) => {

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

export default Connect;
