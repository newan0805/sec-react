const express = require('express');
const cors = require('cors');
const session = require('express-session');
const jsonfile = require('jsonfile');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const app = express();
const port = 8000;

app.use(cors({
  origin: ['*', 'http://localhost:3000', 'http://192.168.8.118', 'http://192.168.8.123'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));

app.use(express.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

const usersFile = 'users.json';
const jwtSecret = 'your-jwt-secret-key';

if (!fs.existsSync(usersFile)) {
  jsonfile.writeFileSync(usersFile, []);
}

// Middleware to check if the user is authenticated
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;
  const sessionUserId = req.session.userId;

  if (!token || !sessionUserId || token !== req.session.token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err || decoded.userId !== sessionUserId) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    next();
  });
};

app.all('/', async (req, res) => {
  res.json({ "Server": "Server is up and running!" });
});

// Sign-up endpoint
app.post('/signup', async (req, res) => {
  const { email, username, password } = req.body;
  const userId = uuidv4();

  console.log(email, username, password)

  if ((!email && !username) || !password) {
    return res.status(400).json({ message: 'Invalid input data' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format', field: 'email' });
  }

  // Load existing users from file
  const users = jsonfile.readFileSync(usersFile);

  // Check if username already exists
  const user = users.find(u => u.username === username) || users.find(u => u.email === email);
  if (user) {
    console.log(user)
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Add new user
  users.push({ userId, email, username, password: hashedPassword });

  // Save updated users to file
  jsonfile.writeFileSync(usersFile, users);

  // Create JWT token
  // const token = jwt.sign({ userId: user.userId }, jwtSecret, { expiresIn: '1h' });

  // req.session.userId = user.userId;
  // req.session.token = token;

  res.json({ userId, email, username });
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, username, password } = req.body;

  if ((!email && !username) || !password) {
    return res.status(400).json({ message: 'Invalid input data. Please provide email or username and password.', field: 'all' });
  }

  // Load existing users from file
  const users = jsonfile.readFileSync(usersFile);

  // Find user by username or email
  const user = users.find(u => u.username === username) || users.find(u => u.email === email);
  // console.log(user)

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Create JWT token
  const token = jwt.sign({ userId: user.userId }, jwtSecret, { expiresIn: '1h' });

  // Set session for the authenticated user
  req.session.userId = user.userId;
  req.session.token = token;

  res.json({uuid: user.userId, email: user.email, username: user.username, token: token });
});

// Logout endpoint
app.post('/logout', authenticateUser, (req, res) => {
  // Destroy the session
  req.session.destroy();

  res.json({ message: 'Logout successful' });
});

// Protected route - requires authentication
app.get('/protected', authenticateUser, (req, res) => {
  res.json({ message: 'Protected route', user: req.session.userId });
});

// Profile route - requires authentication
app.get('/profile', (req, res) => {
  const userId = req.session.userId; // Assuming you have a session with userId

  // Load existing users from file
  const users = jsonfile.readFileSync(usersFile);

  // Find user by userId
  const userProfile = users.find(u => u.userId === userId);

  if (!userProfile) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({uuid: users.userId, email: users.email, username: users.username});

});

app.listen(port, () => {
  const serverAddress = `http://localhost:${port}`;
  console.log(`Server is running on ${serverAddress}`);
});
