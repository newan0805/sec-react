import React, { useState } from 'react';
import Captcha from './Captcha';

const SignIn = ({ onSignIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [captchaVerified, setIsCaptchaVerified] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const showAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage('');
    }, 5000); // Hide the alert after 5 seconds
  };

  const handleSignIn = () => {
    if (!isValidPassword() || !captchaVerified) {
      showAlert('Please ensure the password is valid and captcha is verified.');
      return;
    }

    localStorage.setItem('userCredentials', JSON.stringify({ username, password }));
    onSignIn();
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };

  const handleRePasswordChange = (e) => {
    const newRePassword = e.target.value;
    setRePassword(newRePassword);
  };

  const isValidPassword = () => {
    const minLength = 8;
    const containsUsername = password.toLowerCase().includes(username.toLowerCase());
    const isSimplePassword = password.toLowerCase() === 'password';

    return (
      password.length >= minLength &&
      password === rePassword &&
      !containsUsername &&
      !isSimplePassword
    );
  };

  const getPasswordStrength = () => {
    const minLength = 8;
    const containsUsername = password.toLowerCase().includes(username.toLowerCase());
    const isSimplePassword = password.toLowerCase() === 'password';

    const strength = (password.length / minLength) * 100;

    if (password.length < minLength) return 0;
    if (containsUsername || isSimplePassword) return 25;

    // Limit strength to a maximum of 100%
    return Math.min(strength, 100);
  };

  return (
    <div className="row mt-5">
      <div className="col-md-4 offset-md-4">
        <h2 className="mb-4">Sign In</h2>
        <form>
          {alertMessage && (
            <div className="alert alert-danger" role="alert">
              {alertMessage}
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />

            <label htmlFor="re-password" className="form-label">
              Re-Password
            </label>
            <input
              type="password"
              className="form-control"
              id="re-password"
              value={rePassword}
              onChange={handleRePasswordChange}
            />
          </div>

          <div className="mb-3 mt-2">
            <div className="progress">
              <div
                className={`progress-bar bg-${getPasswordStrength() >= 100 ? 'success' : 'warning'}`}
                role="progressbar"
                style={{ width: `${getPasswordStrength()}%` }}
                aria-valuenow={getPasswordStrength()}
                aria-valuemin="0"
                aria-valuemax="100"
                onChange={getPasswordStrength()}
              >
                {getPasswordStrength()}%
              </div>
            </div>
          </div>

          <Captcha onSuccess={() => setIsCaptchaVerified(true)} />
          {isValidPassword() && (
            <div className="valid-feedback">Password is valid!</div>
          )}

          <button
            type="button"
            className="btn btn-primary mt-3"
            onClick={handleSignIn}
            disabled={!isValidPassword() || !captchaVerified}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
