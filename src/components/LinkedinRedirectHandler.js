import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import qs from "query-string";
function LinkedInRedirectHandler() {

    const navigate = useNavigate();

    useEffect(() => {
        
        const urlParams = new URLSearchParams(window.location.search);

        const code = urlParams.get('code');
        console.log("code", code);

        const accessToken = getAccessToken(code);
  

            //const fetchUserCredentials = async () => {


                
                // const code = urlParams.get('code');
                // console.log("code", code)

                
                
            // const fetchUserCredentials = async (code) => {
            //     try {
            //       // Use the same URL as your backend
            //   const response = await fetch(`http://localhost:5000/api/linkedin/redirect?code=${code}`, {
            //     method: 'POST',
            //     headers: {
            //       'Content-Type': 'application/json',
            //     },
            //     // Send the code as a JSON object
            //     body: JSON.stringify({ code }),
            //   });
            //       const data = await response.json();
                  
            //       if (data.success) {
            //         console.log('data success');
            //         const { name, uid } = data.userCredentials.data.user;
          
            //         setUser({
            //           name,
            //           uid,
            //         });
          
            //         setLoggedIn(true);
                    
            //         // Redirect to the desired URL after successful login
            //         navigate('/editprofile');
          
            //       } else {
            //         console.error('Error fetching user credentials:', data.error);
            //       }
            //     } catch (error) {
            //       console.error('Error fetching user credentials:', error);
            //     }
            //   };
            //}
   


        
    /* if (code) {
            handleLinkedInRedirect(code);
            navigate('/connect')
        } else {
            // Redirect to another page if no code is found
            navigate('/some-other-route');
        }*/
    }, [navigate]);

    const getAccessToken = async (code) => {
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

              return response.data;
          
            //   // Request user profile data from LinkedIn
            //   const profileUrl = 'https://api.linkedin.com/v2/userinfo';
            //   const profileResponse = await axios.get(profileUrl, {
            //   headers: {
            //       Authorization: `Bearer ${response.data.access_token}`,
            //   },
            //   });
          
            //   // Extract relevant user information
            //   const {
            //   name,
            //   sub,
            //   } = profileResponse.data;
          
            //   console.log('User Information:', profileResponse.data);


          } catch (error) {
              console.error('Error fetching user credentials:', error);
      }
    }

    const handleLinkedInRedirect = (code) => {
        // Send the code to your backend
        // ...
        console.log("code2", code)
        navigate('/connect')
    }

    return (
   
    <div>Loading...</div>
       
    );
}

export default LinkedInRedirectHandler;