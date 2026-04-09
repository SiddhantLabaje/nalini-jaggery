const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  cat:         { type: String, required: true },
  price:       { type: String, required: true },
  form:        { type: String },
  packing:     { type: String },
  type:        { type: String },
  img:         { type: String },
  badge:       { type: String, default: '' },
  description: { type: String },
  inStock:     { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
