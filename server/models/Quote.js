const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  type:     { type: String, default: 'quote_enquiry' },
  title:    { type: String },
  name:     { type: String, required: true },
  phone:    { type: String, required: true },
  email:    { type: String },
  company:  { type: String },
  product:  { type: String },
  qty:      { type: String },
  packSize: { type: String },
  city:     { type: String },
  message:  { type: String },
  status:   { type: String, default: 'new' },
}, { timestamps: true });

module.exports = mongoose.model('Quote', quoteSchema);
