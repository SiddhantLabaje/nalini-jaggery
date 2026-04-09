const Lead = require('../models/Lead');

const createLead = async (req, res) => {
  try {
    const { type, product, name, phone, email, city, qty, message } = req.body;
    if (!name || !phone)
      return res.status(400).json({ success: false, message: 'Name and phone are required' });

    const lead = await Lead.create({ type, product, name, phone, email, city, qty, message });
    res.status(201).json({ success: true, data: lead });
  } catch (err) {
    console.error('createLead error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json({ success: true, count: leads.length, data: leads });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { createLead, getLeads };
