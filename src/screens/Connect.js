import React, { useEffect, useState } from 'react';
import LinkedIn from '../components/Linkedin'; // Import LinkedIn component directly
import { useLinkedinAuth } from '../context/LinkedinAuthContext'; // Import useLinkedinAuth hook

const Connect = ({ code }) => {
  const { linkedinSignIn, user } = useLinkedinAuth(); // Use the useLinkedinAuth hook

  useEffect(() => {
    // Check if the user is authenticated and has a UID
    if (user && user.uid) {
      // Fetch additional user information from the server using the user.uid
      // You can replace the following URL with your actual server endpoint
      const serverEndpoint = `http:localhost:5000/api/user/${user.uid}`;

      // Make a GET request to fetch user details
      fetch(serverEndpoint)
        .then(response => response.json())
        .then(data => {
          console.log('Fetched additional user information:', data);

          // Optionally, you can update the user context with the fetched data
          // setUser(prevUser => ({ ...prevUser, additionalData: data }));
        })
        .catch(error => {
          console.error('Error fetching user information:', error);
        });
    }
  }, [user]); // Add dependencies as needed

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
