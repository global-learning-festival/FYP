import React, { useState } from "react";
import AllUsersList from "./AllUsersList";
import QRCodeGenerator from "../screens/QrCodeGenerator";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Connect = () => {
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
            <button
              onClick={handleQRButtonClick}
              className={`text-white bg-[#4B558A] font-medium rounded-md font-medium rounded-md text-sm px-5 py-2.5 mx-5 hover:bg-[#3A426C] hover:drop-shadow-xl`}
            >
              My QR
            </button>

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
            <button
              className={`text-white bg-[#4B558A] font-medium rounded-md font-medium rounded-md text-sm px-5 py-2.5 mx-5 hover:bg-[#3A426C] hover:drop-shadow-xl`}
            >
              QR Scanner
            </button>
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
                <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl">
                  Connect With Others
                </h5>
                <p className="flex flex-col items-center text-center text-sm font-normal text-gray-500 dark:text-gray-400">
                  Network with Guest Speakers and other Attendees of the
                  International Learning Festival!
                </p>
                <div className="text-center text-red-500 mt-4">
                  Please login to view saved events.
                </div>
              </div>
            </div>
          ) : (
            rows
          )}
        </>
      )}
      <>{loggedInUserID !== null && <UserList></UserList>}</>
      <>
        {loggedInUserID !== null && (
          <Link to={`/qrcode/${userid}`}>
            <MyQR />
          </Link>
        )}
      </>
      <>
        {loggedInUserID !== null && (
          <Link to="/scan">
            <QRScanner />
          </Link>
        )}
      </>
    </>
  );
};

const UserList = ({ loggedInUserID }) => {
  return (
    <div className="mt-4">
      {loggedInUserID !== null && (
        <>
          <div className="">
            <AllUsersList />
          </div>
        </>
      )}
    </div>
  );
};

export default Connect;
