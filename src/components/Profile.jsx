import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

const Profile = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Check if user credentials exist in localStorage
    const userCredentials = JSON.parse(localStorage.getItem('userCredentials'));

    if (!userCredentials || !userCredentials.username) {
      // Redirect to the login page if credentials are not found or incomplete
      window.location.href = '/login';
    } else {
      // Set the username for display
      setUsername(userCredentials.username);
    }
  }, []);

  const handleLogout = () => {
    // Clear localStorage and redirect to login
    localStorage.removeItem('userCredentials');
    window.location.href = '/login';
  };

  // Render the profile content if credentials exist
  return (
    <div>
      <h1>Welcome, {username}!</h1>
      <p>This is your profile page.</p>
      {/* Your additional profile content goes here */}
      
      {/* Logout button */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
