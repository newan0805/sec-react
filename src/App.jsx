import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import Login from './components/Login';
import Profile from './components/Profile';
import { AuthProvider } from './controllers/AuthContext';
import './App.css'

import 'bootstrap/dist/css/bootstrap.min.css';
// import './styles/signin.css'

const App = () => {
  const [onSignIn, setOnSignin] = useState('');
  const [onLogin, setOnLogin] = useState('');
  const [onProfile, setOnProifile] = useState('');

  const handleSignIn = (e) => {
    console.log('Signing in...', e);
  };

  const handleLogin = (e) => {
    console.log('Logging in...', e);
  };

  return (
    <AuthProvider >
      <Router>
        <div className='App'>
          <nav className="p-2 navbar navbar-expand-lg navbar-dark">
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
          </nav>
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
    </AuthProvider>
  );
};

export default App;
