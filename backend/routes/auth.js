const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET || 'virtualtaps_secret_2024', { expiresIn: '7d' });

// Register (first time setup)
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: 'Admin already exists' });
    const user = await User.create({ name, email, password });
    res.status(201).json({ token: generateToken(user._id), name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.json({ token: generateToken(user._id), name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
