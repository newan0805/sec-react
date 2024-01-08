import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../App.css'

const Profile = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Check if user credentials exist in localStorage
    const userCredentials = {
      uuid: localStorage.getItem('uuid'),
      email: localStorage.getItem('email'),
      username: localStorage.getItem('username'),
      token: localStorage.getItem('token'),
    }

    console.log(userCredentials)

    if (!userCredentials, !userCredentials.token) {
      // Redirect to the login page if credentials are not found or incomplete
      window.location.href = '/login';
    } else {
      // Set the username for display
      setUsername(userCredentials.username);
    }
  }, []);

  const handleLogout = () => {
    // Clear localStorage and redirect to login
    localStorage.removeItem('uuid');
    localStorage.removeItem('email');
    localStorage.removeItem('username');
    localStorage.removeItem('token');

    window.location.href = '/login';
  };

  // Render the profile content if credentials exist
  return (
    <div className="mt-5">
      <div className="col-md-4 offset-md-4">
      <form>
        <h1>Welcome, {username}!</h1>
        <p>This is your profile page.</p>
        {/* Your additional profile content goes here */}

        {/* Logout button */}
        <button type="button"
          className="btn btn-primary mt-3" 
          onClick={handleLogout}>Logout</button>
      </form>
      </div>
    </div>
  );
};

export default Profile;
