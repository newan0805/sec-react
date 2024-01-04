import React, { useState } from 'react';
import Captcha from './Captcha';
import '../styles/signin.css'

const SignIn = ({ onSignIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  let [captchaVarified, setIsCaptchaVerified] = useState(false);

  const handleSignIn = () => {
    setIsCaptchaVerified = true;
    localStorage.setItem('userCredentials', JSON.stringify({ "username": username, "password": password }));
    onSignIn();
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRePasswordChange = (e) => {
    setRePassword(e.target.value);
  };

  const isValidPassword = () => {
    const minLength = 8;
    const containsUsername = password.includes(username.toLowerCase());
    const isSimplePassword = password.toLowerCase() === 'password';

    return (
      password.length >= minLength &&
      password === rePassword &&
      !containsUsername &&
      !isSimplePassword
    );
  };

  return (
    <div className='row'>
      <div className="mt-5">
        <div className="col-md-4">
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
                onChange={handlePasswordChange}
              />
              <label htmlFor="re-password" className="form-label">Re-Password</label>
              <input
                type="password"
                className="form-control"
                id="re-password"
                value={rePassword}
                onChange={handleRePasswordChange}
              />
            </div>
            <Captcha onSuccess={handleSignIn} />
            {isValidPassword() && (
              <div className="valid-feedback">Password is valid!</div>
            )}
            <button type="button" className="btn btn-primary mt-3" onClick={handleSignIn} disabled={!isValidPassword() && captchaVarified? true : false}>
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
