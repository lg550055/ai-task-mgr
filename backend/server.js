const express = require('express');
const session = require('express-session');
const cors = require('cors');
const authRoutes = require('./routes/login');
const taskRoutes = require('./routes/tasks');
const aiRoutes = require('./routes/ai');
const auth = require('./auth');
require('dotenv').config();
require('./db');

const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
}));

app.get('/x', (req, res) => {
  res.send('Hello from Express!');
});

app.use('/auth', authRoutes);
app.use('/tasks', auth, taskRoutes);
app.use('/ai', auth, aiRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));