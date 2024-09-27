const mongoose = require('mongoose');

// Define the inventory schema
const inventorySchema = new mongoose.Schema({
  schoolId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  items: [{
    itemId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Item', 
      required: true 
    },
    size: { 
      type: String, 
      required: true 
    },
    quantity: { 
      type: Number, 
      required: true, 
      min: 0 
    }
  }],
  lastUpdated: { 
    type: Date, 
    default: Date.now // Defaults to current date
  }
});

module.exports = mongoose.model('Inventory', inventorySchema);
