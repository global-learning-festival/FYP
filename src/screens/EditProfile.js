import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const EditProfileForm = () => {
  const [user, setUser] = useState({});
  const { userid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/${userid}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    fetchData();
  }, [userid]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/user/${userid}`, user);
      
      // Show success notification
      NotificationManager.success('Changes saved successfully');

      // Redirect after a delay
      setTimeout(() => {
        navigate('/');
      }, 600);
    } catch (error) {
      console.error('Error updating user profile:', error.message);
      // Show error notification
      NotificationManager.error('Error updating user profile');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-600">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={user.username || `${user.first_name || 'N/A'} ${user.last_name || 'N/A'}`}
            onChange={handleChange}
            readOnly // Make the username field non-editable
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="company" className="block text-sm font-medium text-gray-600">
            Company Name
          </label>
          <input
            type="text"
            name="company"
            value={user.company || ''}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="linkedinurl" className="block text-sm font-medium text-gray-600">
            LinkedIn URL
          </label>
          <input
            type="text"
            name="linkedinurl"
            value={user.linkedinurl || ''}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
<NotificationContainer />
    </div>
  );
};

export default EditProfileForm;

