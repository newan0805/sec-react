// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const login = async (userData) => {
    try {
      const response = await fetch('http://192.168.8.118:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);

        localStorage.setItem('email', data.email);
        localStorage.setItem('username', data.username);
        localStorage.setItem('token', data.token);

        return { msg: 'Login Success!', stat: true };
      } else {
        const errorData = await response.json();
        setError(errorData.message);
        return { msg: errorData.message, stat: false };
      }
    } catch (error) {
      setError('Error during login: ' + error.message);
      return { msg: error.message, stat: 500 }; // Use a status code to indicate server error
    }
  };

  const signup = async (userData) => {
    try {
      const response = await fetch('http://192.168.8.118:8000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        return { msg: 'Signup Success!', stat: true };
      } else {
        const errorData = await response.json();
        setError(errorData.message);
        return { msg: errorData.message, stat: false };
      }
    } catch (error) {
      setError('Error during signup: ' + error.message);
      return { msg: error.message, stat: false };
    }
  };

  const logout = async () => {
    try {
      const response = await fetch('http://192.168.8.118:8000/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (data.ok) {
        setUser(null); // Clear user data on logout
        return { msg: 'Logout Success!', stat: data.ok };
      } else {
        const errorData = await response.json();
        setError(errorData.message);
        return { msg: errorData.message, stat: data.status };
      }
    } catch (error) {
      setError('Error during logout: ' + error.message);
      return { msg: error.message, stat: 500 };
    }
  };

  return (
    <AuthContext.Provider value={{ login, signup, logout, user, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
