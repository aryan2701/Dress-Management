// routes/supplier.js
const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');
const authMiddleware = require('../middleware/authMiddleware');


// Dispatch items
router.post('/dispatch', authMiddleware, supplierController.dispatchItems);

// Get all dispatched items
router.get('/dispatched', authMiddleware, supplierController.getDispatchedItems);


module.exports = router;
