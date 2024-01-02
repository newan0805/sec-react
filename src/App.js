// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import SignIn from './components/SignIn';
import Login from './components/Login';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const handleSignIn = () => {
    // Implement sign-in logic, e.g., send credentials to the server
    console.log('Signing in...');
  };

  const handleLogin = () => {
    // Implement login logic, e.g., check credentials against stored data
    console.log('Logging in...');
  };

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link className="navbar-brand" to="/">React Auth</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/signin">Sign In</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <hr />
        <Route
          path="/signin"
          render={() => <SignIn onSignIn={handleSignIn} />}
        />
        <Route
          path="/login"
          render={() => <Login onLogin={handleLogin} />}
        />
      </div>
    </Router>
  );
};

export default App;
