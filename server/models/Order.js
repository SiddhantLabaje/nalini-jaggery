const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  phone:     { type: String, required: true },
  email:     { type: String },
  city:      { type: String },
  product:   { type: String, required: true },
  qty:       { type: String },
  message:   { type: String },
  status:    { type: String, default: 'new' },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
