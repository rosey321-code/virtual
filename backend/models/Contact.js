const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String, trim: true },
  service: { type: String, enum: ['Social Media Marketing', 'Content Creation', 'Branding', 'SEO', 'Web Development', 'Paid Ads', 'Other'] },
  budget: { type: String },
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Contact', contactSchema);
