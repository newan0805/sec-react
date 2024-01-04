import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import Login from './components/Login';

import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/signin.css'
import Profile from './components/Profile';

const App = () => {
  const handleSignIn = () => {
    console.log('Signing in...');
  };

  const handleLogin = () => {
    console.log('Logging in...');
  };

  return (
    <Router>
      <div className="container">
        { /* <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link className="navbar-brand" to="/">Secure login</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/signin">Signup</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <hr /> */ }
        <Routes>
        <Route
          path="/signin"
          element={<SignIn onSignIn={handleSignIn} />}
        />
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} />}
          />
          <Route
            path="/"
            element={<Profile onLogin={handleLogin} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
