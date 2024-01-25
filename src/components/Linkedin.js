// LinkedIn.js
import React, { useEffect, useState } from 'react';
import { LinkedInApi } from '../config';
import linkedInLoginImage from '../images/linkedin-login-images/Retina/Sign-In-Small---Default.png';

const LinkedIn = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const code = urlSearchParams.get('code');

    if (code) {
      // If the code is present in the URL, fetch user credentials
      getUserCredentials(code);
    }
  }, []);

  const getUserCredentials = async (code) => {
    try {
      const response = await fetch(`/api/linkedin/redirect?code=${code}`);
      const data = await response.json();
      
      if (data.success) {
        const { name, uid } = data.userCredentials.data.user;

        setUser({
          name,
          uid,
        });

        setLoggedIn(true);
        // Redirect to the desired URL after successful login
        window.location.href = 'http://localhost:3000/editprofile';
      } else {
        console.error('Error fetching user credentials:', data.error);
      }
    } catch (error) {
      console.error('Error fetching user credentials:', error);
    }
  };

  const handleLinkedInClick = () => {
    // Redirect to LinkedIn OAuth URL
    window.location.href = `${LinkedInApi.oauthUrl}?client_id=${LinkedInApi.clientId}&redirect_uri=${encodeURIComponent(LinkedInApi.redirectUri)}&scope=${LinkedInApi.scope}&response_type=code`;
  };

  const contentWhenLoggedIn = (
    <div>
      {/* Display user information */}
      <h3>{`Welcome, ${user.name}!`}</h3>
    </div>
  );  

  const contentWhenLoggedOut = (
    <img
      src={linkedInLoginImage}
      alt="Sign in with LinkedIn"
      onClick={handleLinkedInClick}
    />
  );

  return <div>{loggedIn ? contentWhenLoggedIn : contentWhenLoggedOut}</div>;
};

export default LinkedIn;
