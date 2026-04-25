const express = require('express');
const router = express.Router();

// Static services data (can be moved to DB later)
const services = [
  {
    id: 1,
    title: 'Social Media Marketing',
    icon: 'chart',
    description: 'Data-driven social strategies that grow your audience and drive real engagement across all platforms.',
    features: ['Content Strategy', 'Community Management', 'Analytics & Reporting', 'Competitor Analysis'],
    price: 'Starting at PKR 25,000/mo'
  },
  {
    id: 2,
    title: 'Content Creation',
    icon: 'pen',
    description: 'High-quality visuals, reels, and copy that stop the scroll and tell your brand story.',
    features: ['Graphic Design', 'Video Production', 'Reels & Shorts', 'Copywriting'],
    price: 'Starting at PKR 20,000/mo'
  },
  {
    id: 3,
    title: 'Branding & Identity',
    icon: 'star',
    description: 'Complete brand packages that make you unforgettable — from logo to brand voice.',
    features: ['Logo Design', 'Brand Guidelines', 'Color Palette', 'Typography'],
    price: 'Starting at PKR 35,000'
  },
  {
    id: 4,
    title: 'Paid Advertising',
    icon: 'target',
    description: 'ROI-focused Meta & Google ad campaigns that turn spend into revenue.',
    features: ['Meta Ads', 'Google Ads', 'A/B Testing', 'Retargeting'],
    price: 'Starting at PKR 30,000/mo'
  },
  {
    id: 5,
    title: 'SEO & Content',
    icon: 'search',
    description: 'Rank higher on Google and drive organic traffic with proven SEO strategies.',
    features: ['Keyword Research', 'On-Page SEO', 'Blog Writing', 'Link Building'],
    price: 'Starting at PKR 22,000/mo'
  },
  {
    id: 6,
    title: 'Web Development',
    icon: 'code',
    description: 'Fast, modern websites built with React & Node.js that convert visitors into customers.',
    features: ['React Frontend', 'Node.js Backend', 'MongoDB Database', 'Custom CMS'],
    price: 'Starting at PKR 80,000'
  }
];

router.get('/', (req, res) => res.json(services));
router.get('/:id', (req, res) => {
  const s = services.find(s => s.id === parseInt(req.params.id));
  if (!s) return res.status(404).json({ error: 'Service not found' });
  res.json(s);
});

module.exports = router;
