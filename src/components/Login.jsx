import React, { useState } from 'react';
import { useAuth } from '../controllers/AuthContext';
import Captcha from './Captcha';
import Alert from './Alerts';

const Login = ({ onLogin }) => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleCaptchaSuccess = () => {
    console.log('Captcha verified!');
    setShowCaptcha(false);
  };

  const handleLogin = async () => {
    const userData = { username, password };
    let res = await login(userData);
    console.log(res)
    try {
      if (res) {
        setAlert({ type: "text", message: `${res.msg}`, status: res.stat ? "success" : "danger" });
        onLogin(res.msg);
        // window.location.href = "/"
      }
      // setAlert(res)
      setLoginAttempts(0);
    } catch (error) {
      console.error('Login error:', error);
      setLoginAttempts(loginAttempts + 1);

      if (loginAttempts >= 3) {
        setShowCaptcha(true);
      }
    }
  };

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
