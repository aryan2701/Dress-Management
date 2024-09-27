// models/Item.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },  // shirt, pants, tracksuit, etc.
  sizes: [String], 
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
});

module.exports = mongoose.model('Item', itemSchema);
