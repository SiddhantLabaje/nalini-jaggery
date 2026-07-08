const Quote = require('../models/Quote');

const createQuote = async (req, res) => {
  try {
    const { name, phone, email, title, company, product, qty, packSize, city, message } = req.body;
    if (!name || !phone)
      return res.status(400).json({ success: false, message: 'Name and phone are required' });

    const quote = await Quote.create({ title, name, phone, email, company, product, qty, packSize, city, message });
    res.status(201).json({ success: true, data: quote });
  } catch (err) {
    console.error('createQuote error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.json({ success: true, count: quotes.length, data: quotes });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const updateQuoteStatus = async (req, res) => {
  try {
    const quote = await Quote.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!quote) return res.status(404).json({ success: false, message: 'Quote not found' });
    res.json({ success: true, data: quote });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { createQuote, getQuotes, updateQuoteStatus };
