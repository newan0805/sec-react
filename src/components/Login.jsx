import React, { useState } from 'react';
import Captcha from './Captcha';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [showCaptcha, setShowCaptcha] = useState(false);

  const handleLogin = () => {
    // Mocked login - retrieve credentials from localStorage
    const storedCredentials = JSON.parse(localStorage.getItem('userCredentials'));

    if (
      storedCredentials &&
      storedCredentials.username === username &&
      storedCredentials.password === password
    ) {
      console.log('Login successful!');
      // Reset login attempts on successful login
      setLoginAttempts(0);
      // Implement actual login logic here, e.g., redirect to dashboard
    } else {
      console.log('Invalid credentials!');
      // Increase login attempts
      setLoginAttempts(loginAttempts + 1);

      // Show CAPTCHA after 3 consecutive login failures
      if (loginAttempts >= 2) {
        setShowCaptcha(true);
      }
    }
  };

  const handleCaptchaSuccess = () => {
    // Callback when the CAPTCHA is successfully verified
    console.log('Captcha verified!');
    setShowCaptcha(false); // Reset CAPTCHA state
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-6 offset-md-3">
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
    </div>
  );
};

export default Login;
