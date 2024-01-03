import React, { useState } from 'react';
import Captcha from './Captcha';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [showCaptcha, setShowCaptcha] = useState(false);

  const handleLogin = () => {
    const storedCredentials = JSON.parse(localStorage.getItem('userCredentials'));

    if (
      storedCredentials &&
      storedCredentials.username === username &&
      storedCredentials.password === password
    ) {
      console.log('Login successful!');
      setLoginAttempts(0);
    } else {
      console.log('Invalid credentials!');
      setLoginAttempts(loginAttempts + 1);

      if (loginAttempts >= 2) {
        setShowCaptcha(true);
      }
    }
  };

  const handleCaptchaSuccess = () => {
    console.log('Captcha verified!');
    setShowCaptcha(false);
  };

  return (
      <div className="row mt-5">
        <div className="col-md-4 offset-md-4">
          <h2 className="mb-4">Login</h2>
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
            {showCaptcha ? (
              <Captcha onSuccess={handleCaptchaSuccess} />
            ) : (
              <button type="button" className="btn btn-primary" onClick={handleLogin}>
                Login
              </button>
            )}
          </form>
        </div>
      </div>
  );
};

export default Login;
