// models/Dispatch.js
const mongoose = require('mongoose');

const dispatchSchema = new mongoose.Schema({
  supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
    size: String,
    quantity: Number,
    price: Number  // Add price field here
  }],
  status: { type: String, default: 'pending' },  // pending or delivered
  dispatchedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Dispatch', dispatchSchema);
