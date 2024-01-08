import React, { useState } from 'react';
import { useAuth } from '../controllers/AuthContext';
import Captcha from './Captcha';
import Alert from '../components/Alerts';

const SignIn = ({ onSignIn }) => {
  const { signup } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [email, setEmail] = useState('');
  const [captchaVerified, setIsCaptchaVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState('');

  const handleSignIn = async (e) => {
    // e.preventDefault();

    // if (!isValidEmail(email) || !isValidPassword() || !captchaVerified) {
    //   showAlert('Please ensure the email, password, and captcha are valid.');
    //   return;
    // }
    const userData = { "email": email, "username": username, "password": password };
    let res = await signup(userData);
    console.log(res);

    try {
      if (res) {
        setAlert({ type: "text", message: `${res.msg}`, status: res.stat ? "success" : "danger" });
        onSignIn();
        // window.location.href = "/"
      }
    } catch (error) {
      setAlert({ type: "text", message: `${res.msg}`, status: res.stat ? "success" : "danger" });
      // showAlert('Sign In failed. Please try again.');
    }
  };

  const handleUsernameChange = (e) => {
    const uname = e.target.value;
    setUsername(uname);
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

  const isValidPassword = () => {
    const minLength = 8;
    const containsUsername = password.toLowerCase().includes(username.toLowerCase());
    const isSimplePassword = password.toLowerCase() === 'password';
    const hasSpecialCharacters = /[!@#$%^&*]/.test(password);

    console.log("valid pass: ", containsUsername, isSimplePassword, hasSpecialCharacters)


    if (password.length >= minLength) {
      setAlert({
        type: "text",
        message: "Password needs to have least 8 charactors!",
        status: "warning"
      })
    }

    let rsp = (
      password === rePassword &&
      !containsUsername &&
      !isSimplePassword &&
      hasSpecialCharacters
    )
    console.log(rsp)
    return rsp;
  };

  const getPasswordStrength = () => {
    const minLength = 8;
    // const containsUsername = password.toLowerCase().includes(username.toLowerCase());
    // const isSimplePassword = password.toLowerCase() === 'password';

    const strength = (password.length / minLength) * 100;

    // if (password.length < minLength) return 0;
    // if (containsUsername || isSimplePassword) return 100;
    console.log(Math.min(strength, 100))
    return Math.min(strength, 100);
  };

  let percentage = getPasswordStrength() >= 75 ? 'success' : 'warning' && getPasswordStrength() <= 35 ? 'danger' : 'warning';

  return (
    <div className="mt-5">
      <div className="col-md-4 offset-md-4">
        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            status={alert.status}
            onClose={() => setAlert(null)}
          />
        )}
        <h2 className="mb-4">Sign In</h2>
        <form>
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
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={handleUsernameChange}
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
                className={`progress-bar bg-${percentage}`}
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
          {isValidPassword() && isValidEmail(email) && (
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
