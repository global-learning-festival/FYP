//LinkedinRedirectHandler.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LinkedInRedirectHandler() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const urlParams = new URLSearchParams(window.location.search);
  const localhostapi = "http://localhost:5000";
  const serverlessapi = "https://adminilftest-4tmd.onrender.com";

  const code = urlParams.get("code");
  console.log("code", code);

  //setIsLoading(true);
  const fetchUserData = async (code) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${serverlessapi}/getLinkedInUserData`,
        {
          code: code,
        }
      );
      // Axios automatically parses the JSON response,
      // so you can directly access `response.data`
      const data = response.data;
      console.log("Data received from LinkedIn API:", data);

      // Check if data has the expected properties
      const {
        localizedFirstName,
        localizedHeadline,
        vanityName,
        id,
        localizedLastName,
      } = data;

      console.log("firstName:", localizedFirstName);
      console.log("headline:", localizedHeadline);
      console.log("vanityName:", vanityName);
      console.log("id:", id);
      console.log("lastName:", localizedLastName);

      const first_name = localizedFirstName;
      const company = localizedHeadline ? localizedHeadline : "";
      const last_name = localizedLastName;
      const linkedinurl = `https://www.linkedin.com/in/${vanityName}`;
      const uid = id;

      console.log("first_name", first_name);
      console.log("company", company);
      console.log("last_name", last_name);
      console.log("linkedinurl", linkedinurl);
      console.log("uid", uid);

      console.log("Before if block");
      if (first_name && company && last_name && linkedinurl && uid) {
        console.log("Inside if block");
        setUserData(data);
        setIsLoading(false);

        console.log("User exists. Logging data:", data);

          // Store uid in localStorage
          localStorage.setItem("loggedInUserID", uid);
          console.log("loggedInUserID inserted");
          navigate(`/editprofile/${loggedInUserID}`);

        // Post user data to adduser endpoint
        const addUserResponse = await axios.post(
          `${serverlessapi}/addlinkedinuser`,
          {
            first_name,
            company,
            last_name,
            linkedinurl,
            uid,
            type: process.env.REACT_APP_TYPE,
          };
          // Post user data to adduser endpoint
          const addUserResponse = await axios.post(
            `${serverlessapi}/addlinkedinuser`,
            userData
          );
          console.log("User added to the database:", addUserResponse.data);

          // Store uid in localStorage
          localStorage.setItem("loggedInUserID", uid);
          console.log("loggedinUserID");

          // Navigate to the edit profile page using the uid from the response
          navigate(`/editprofile/${loggedInUserID}`);
        }
      } else {
        console.error("Missing expected properties in data:", data);
        setIsLoading(false);
      }
      return data;
    } catch (error) {
      console.error("Error fetching data: ", error);
      setError(error); // Assuming setError is a useState setter for handling errors
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // ... (existing code)

    fetchUserData(code)
      .then((data) => {
        console.log(`FetchData: ${JSON.stringify(data)}`);
        // Handle the received credentials (e.g., store them, redirect, etc.)
        // Ensure userData is updated after successful fetch
        setUserData(data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetchUserData call
      });
  }, [code]);

  // Logout function to clear loggedinUserId from localStorage
  const handleLogout = () => {
    localStorage.removeItem("loggedinUserID");
    // Perform any other logout-related actions here
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>User Data</h1>
      {/* Render your userData here */}
      <pre>{JSON.stringify(userData, null, 2)}</pre>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default LinkedInRedirectHandler;
