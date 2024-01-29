  // LinkedIn.js
  import React, { useCallback, useEffect, useState } from 'react';
  import { LinkedInApi } from '../config';
  import linkedInLoginImage from '../images/linkedin-login-images/Retina/Sign-In-Small---Default.png';
  import { useNavigate } from 'react-router-dom';
  import axios from 'axios';
  import qs from "query-string"


  const LinkedInLogin = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [getUserCredentials, setGetUserCredentials] = useState(() => () => {});


    const navigate = useNavigate();

    useEffect(() => {
      const fetchUserCredentials = async (code) => {
        try {

          console.log('Starting Redirect function');

          const payload = {
            client_id: '86bmj5hgj05pbm',
            client_secret: 'SLqhmywaNKgICBMw',
            redirect_uri: 'http://localhost:3000/linkedin/redirect',
            grant_type: 'authorization_code',
            code: code,
            };

            console.log(payload)
        

    const tokenUrl = `https://www.linkedin.com/oauth/v2/accessToken`;

    const response = await axios.post(tokenUrl, qs.stringify(payload), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    // Log the successful token response for debugging
    console.log('Token Response:', response.data);

    // Request user profile data from LinkedIn
    const profileUrl = 'https://api.linkedin.com/v2/userinfo';
    const profileResponse = await axios.get(profileUrl, {
      headers: {
        Authorization: `Bearer ${response.data.access_token}`,
      },
    });

    // Extract relevant user information
    const {
      name,
      sub,
    } = profileResponse.data;

    console.log('User Information:', profileResponse.data);



          // Use the same URL as your backend
      // const response = await fetch(`http://localhost:5000/api/?code=${code}`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   // Send the code as a JSON object
      //   body: JSON.stringify({ code }),
      // });
      //     const data = await response.json();
          
      //     if (data.success) {
      //       console.log('data success');
      //       const { name, uid } = data.userCredentials.data.user;
  
      //       setUser({
      //         name,
      //         uid,
      //       });
  
      //       setLoggedIn(true);
            
      //       // Redirect to the desired URL after successful login
      //       navigate('/editprofile');
  
      //     } else {
      //       console.error('Error fetching user credentials:', data.error);
      //     }
        } catch (error) {
          console.error('Error fetching user credentials:', error);
        }
      };

      setGetUserCredentials(() => fetchUserCredentials);
      
      const urlSearchParams = new URLSearchParams(window.location.search);
      const code = urlSearchParams.get('code');

      if (code) {
        // If the code is present in the URL, fetch user credentials
        fetchUserCredentials(code);
      }
    }, []);

    const handleLinkedInClick = () => {
      console.log('LinkedIn button clicked');
      // Redirect to LinkedIn OAuth URL
      window.location.href = `${LinkedInApi.oauthUrl}?client_id=${LinkedInApi.clientId}&redirect_uri=${encodeURIComponent(LinkedInApi.redirectUri)}&scope=${LinkedInApi.scope}&response_type=code`;
    };

    const contentWhenLoggedIn = (
      <div>
        {/* Display user information*/}
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

  export default LinkedInLogin;