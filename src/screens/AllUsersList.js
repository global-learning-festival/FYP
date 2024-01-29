import QRCode from 'qrcode.react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QRCodePopupCard = ({ title, qrCodeValue, onClose }) => {
  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-6 border border-gray-200 rounded-md shadow'>
        <h5 className='mb-2 text-2xl font-bold tracking-tight text-black'>{title}</h5>
        <div className="mb-4">
          <QRCode value={qrCodeValue} />
        </div>
        <button onClick={onClose} className='mt-4 bg-blue-500 text-white px-4 py-2 rounded-md'>
          Close
        </button>
      </div>
    </div>
  );
};

const AllUsersList = () => {
  const [userData, setUserData] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/userlist`);
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleCardClick = (user) => {
    if (user.linkedinurl !== null && user.linkedinurl !== undefined) {
      setSelectedUser(user);
    }
  };

  const handlePopupClose = () => {
    setSelectedUser(null);
  };

  return (
    <div className="max-w-screen-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Users and QR Codes</h2>
      {userData && (
        <div>
          {userData.map((user) => (
            <div key={user.id} className="bg-white p-4 rounded-lg shadow-md mb-4" onClick={() => handleCardClick(user)}>
              <p className="mb-2">{`Name: ${user.username || user.first_name || 'N/A'} ${user.last_name || 'N/A'}`}</p>
              <p className="mb-2">{`Job Title: ${user.jobtitle || 'N/A'}`}</p>
              <p className="mb-2">{`Company: ${user.company || 'N/A'}`}</p>
            </div>
          ))}
        </div>
      )}
      {selectedUser &&  (
        <QRCodePopupCard title={`QR Code for ${selectedUser.username || selectedUser.first_name || 'N/A'} ${selectedUser.last_name || 'N/A'}`} qrCodeValue={selectedUser.linkedinurl} onClose={handlePopupClose} />
      )}
    </div>
  );
};

export default AllUsersList;
