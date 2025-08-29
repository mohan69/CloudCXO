const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const { nanoid } = require('nanoid');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

const file = path.join(__dirname, 'data.json');

function loadDB() {
  try {
    const raw = fs.readFileSync(file, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    return { users: [], registrations: [] };
  }
}

function writeDB(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
}

// ensure file exists
if (!fs.existsSync(file)) {
  writeDB({ users: [], registrations: [] });
}

// Simple auth: POST /api/auth/login
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'username and password required' });
  }

  const data = loadDB();
  const user = data.users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  // Return user data and a mock token
  return res.json({ user: { username: user.username, role: user.role }, token: `mock-${nanoid()}` });
});

// POST /api/auth/register
app.post('/api/auth/register', (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'username and password required' });

  const data = loadDB();
  const exists = data.users.find(u => u.username === username);
  if (exists) return res.status(409).json({ error: 'User already exists' });

  const newUser = { id: nanoid(), username, password, role: role || 'user' };
  data.users.push(newUser);
  writeDB(data);
  return res.status(201).json({ user: { username: newUser.username, role: newUser.role }, token: `mock-${nanoid()}` });
});

// POST /api/registrations - CXO registration submission
app.post('/api/registrations', (req, res) => {
  const registration = req.body;
  if (!registration || !registration.email) return res.status(400).json({ error: 'Invalid registration' });

  const data = loadDB();
  const record = { id: nanoid(), createdAt: new Date().toISOString(), ...registration };
  data.registrations.push(record);
  writeDB(data);
  return res.status(201).json({ success: true, id: record.id });
});

// GET endpoints for debugging
app.get('/api/users', (req, res) => {
  const data = loadDB();
  res.json(data.users);
});
app.get('/api/registrations', (req, res) => {
  const data = loadDB();
  res.json(data.registrations);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
