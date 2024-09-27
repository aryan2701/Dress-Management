const mongoose = require('mongoose');

// Define the sale schema
const saleSchema = new mongoose.Schema({
  schoolId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  studentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Student', 
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
      min: 1 
    },
    price: { 
      type: Number, 
      required: true, 
      min: 0 
    }
  }],
  totalAmount: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  soldAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Ensure to set the `strictPopulate` option if needed
saleSchema.set('strictPopulate', false);

module.exports = mongoose.model('Sale', saleSchema);
