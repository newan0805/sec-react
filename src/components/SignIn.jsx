import React, { useState } from 'react';
import Captcha from './Captcha';

const SignIn = ({ onSignIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [email, setEmail] = useState('');
  const [captchaVerified, setIsCaptchaVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const showAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage('');
    }, 6000);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log("handle signin: ",isValidEmail(email),isValidPassword(password),captchaVerified)
    if (!isValidEmail(email) || !isValidPassword() || !captchaVerified) {
      showAlert('Please ensure the email, password, and captcha are valid.');
      return;
    }

    localStorage.setItem('userCredentials', JSON.stringify({ username, password, email }));
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

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (pass) => {
    const minLength = 8;
    const containsUsername = password.toLowerCase().includes(username.toLowerCase());
    const isSimplePassword = password.toLowerCase() === 'password';
    const hasSpecialCharacters = /[!@#$%^&*]/.test(password);

    console.log("valid pass: ",containsUsername, isSimplePassword, hasSpecialCharacters)

    return (
      password.length >= minLength &&
      password === rePassword &&
      !containsUsername &&
      !isSimplePassword &&
      hasSpecialCharacters
    );
  };

  const getPasswordStrength = () => {
    const minLength = 8;
    const containsUsername = password.toLowerCase().includes(username.toLowerCase());
    const isSimplePassword = password.toLowerCase() === 'password';

    const strength = (password.length / minLength) * 100;

    if (password.length < minLength) return 0;
    // if (containsUsername || isSimplePassword) return 100;

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
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="re-password" className="form-label">
              Re-Password
            </label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                id="re-password"
                value={rePassword}
                onChange={handleRePasswordChange}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
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
              >
                {getPasswordStrength()}%
              </div>
            </div>
          </div>

          <Captcha onSuccess={() => setIsCaptchaVerified(true)} />
          {isValidPassword(password) && isValidEmail(email) && (
            <div className="valid-feedback">Email and Password are valid!</div>
          )}

          <button
            type="button"
            className="btn btn-primary mt-3"
            onClick={handleSignIn}
            // disabled={!isValidPassword() || !isValidEmail(email) || !captchaVerified}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
