import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import axios from "axios";
import { useParams } from "react-router-dom";

const QRCodeGenerator = () => {
  const [userData, setUserData] = useState(null);
  const loggedInUserID = localStorage.getItem("loggedInUserID");
  const localhostapi = "http://localhost:5000";
  const serverlessapi = "https://adminilftest.onrender.com";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${serverlessapi}/useruid/${loggedInUserID}`
        );
        // Use response.data instead of await response.json()
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [loggedInUserID]);

  return (
    <div className="max-w-screen-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your QR Code</h2>
      {userData && (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="mb-2">{`Username: ${
            userData.username || userData.first_name || "N/A"
          } ${userData.last_name || "N/A"}`}</p>
          <QRCode value={userData.linkedinurl} />
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
