import React, { useState, useEffect } from "react";
import axios from "axios";

function LinkedInRedirectHandler() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const localhostapi = "http://localhost:5000";
    const serverlessapi = "https://fyp-9bxz.onrender.com";
  
    const code = urlParams.get("code");
    console.log("code", code);

    //setIsLoading(true);
    const fetchUserData = async (code) => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${serverlessapi}/getLinkedInUserData`,
          { code: code }
        );
        // Axios automatically parses the JSON response,
        // so you can directly access `response.data`
        const data = response.data;
        console.log("frontend log for getLinkedinuserdata" + data);
        setUserData(data);
        setIsLoading(false);
        return data;
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(error); // Assuming setError is a useState setter for handling errors
        setIsLoading(false);
      }
    };

    fetchUserData(code)
      .then((data) => {
        console.log(`FetchData: ${JSON.stringify(data)}`);
        // Handle the received credentials (e.g., store them, redirect, etc.)
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetchUserCredentials call
      });
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>User Data</h1>
      {/* Render your userData here */}
      <pre>{JSON.stringify(userData, null, 2)}</pre>
    </div>
  );
}

export default LinkedInRedirectHandler;
