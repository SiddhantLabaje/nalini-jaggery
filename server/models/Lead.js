const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  type:    { type: String, default: 'product_enquiry' },
  product: { type: String },
  name:    { type: String, required: true },
  phone:   { type: String, required: true },
  email:   { type: String },
  city:    { type: String },
  qty:     { type: String },
  message: { type: String },
  status:  { type: String, default: 'new' },
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);
