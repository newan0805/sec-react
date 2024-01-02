// src/components/SignIn.js
import React, { useState } from 'react';
import Captcha from './Captcha';

const SignIn = ({ onSignIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // Mocked authentication - store credentials in localStorage
    localStorage.setItem('userCredentials', JSON.stringify({ username, password }));
    onSignIn();
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-6 offset-md-3">
          <h2 className="mb-4">Sign In</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Captcha onSuccess={handleSignIn} />
            <button type="button" className="btn btn-primary" onClick={handleSignIn}>Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
