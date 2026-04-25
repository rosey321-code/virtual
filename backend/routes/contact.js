const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { protect } = require('../middleware/auth');

// POST /api/contact - Submit contact form (public)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, service, budget, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }
    const contact = await Contact.create({ name, email, phone, service, budget, message });
    res.status(201).json({ success: true, message: 'Message sent! We will get back to you soon.', id: contact._id });
  } catch (err) {
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
});

// GET /api/contact - Get all contacts (admin only)
router.get('/', protect, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PATCH /api/contact/:id - Update status (admin only)
router.patch('/:id', protect, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
