import React, { useEffect, useState } from "react";
import AllUsersList from "./AllUsersList";
import QRCodeGenerator from "./QrCodeGenerator";
import QRCodeVerifier from "./QrCodeScanner";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/App.css";
import qrcodeimg from "../assets/qr-code.png";
import scanimg from "../assets/scan.png";
import GoogleButton from "react-google-button";
import { UserAuth } from "../context/AuthContext";

const Connect = () => {
  const { googleSignIn, user } = UserAuth();
  const [userData, setUserData] = useState(null);
  const loggedInUserID = localStorage.getItem("loggedInUserID");
  const [loading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("All");
  const { userid } = useParams();
  const rows = [];

  const MyQR = ({ loggedInUserID }) => {
    const [showQRCode, setShowQRCode] = useState(false);

    const handleQRButtonClick = () => {
      setShowQRCode(!showQRCode);
    };

    return (
      <div>
        {loggedInUserID !== null && (
          <>
            <a onClick={handleQRButtonClick}>
              <img
                src={qrcodeimg}
                className="object-contain h-12 w-24  md:object-scale-down"
              ></img>
            </a>

            {showQRCode && <QRCodeGenerator uid={loggedInUserID} />}
          </>
        )}
      </div>
    );
  };

  const QRScanner = ({ loggedInUserID }) => {
    return (
      <div>
        {loggedInUserID !== null && (
          <>
            <a>
              <img
                src={scanimg}
                className="object-contain h-12 w-24  md:object-scale-down"
              ></img>
            </a>
          </>
        )}
      </div>
    );
  };

  const UserList = ({ loggedInUserID }) => {
    return (
      <div className="mt-2">
        {loggedInUserID !== null && (
          <>
            <div className="flex flex-col items-center mb-4">
              <h2 className="text-2xl font-bold mb-4">Connect with Others</h2>
              <div className="flex justify-center">
                <Link to={`/qrcode/${userid}`}>
                  <MyQR />
                </Link>
                <Link to="/scan">
                  <QRScanner />
                </Link>
              </div>
            </div>
            <div>
              <AllUsersList />
            </div>
          </>
        )}
      </div>
    );
  };

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
                <h5 className="mb-3 text-xl font-semibold text-gray-900 md:text-xl">
                  Connect With Others
                </h5>
                <p className="flex flex-col items-center text-center text-sm font-normal text-gray-500 dark:text-gray-400">
                  Network with Guest Speakers and other Attendees of the
                  International Learning Festival!
                </p>
                <div className="flex items-center justify-center mt-3">
                  <GoogleButton onClick={googleSignIn} />
                </div>
              </div>
            </div>
          ) : (
            <UserList loggedInUserID={loggedInUserID} />
          )}
        </>
      )}
    </>
  );
};

export default Connect;
