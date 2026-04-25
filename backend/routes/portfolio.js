const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');
const { protect } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category && category !== 'All' ? { category } : {};
    const items = await Portfolio.find(filter).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const item = await Portfolio.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    await Portfolio.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
