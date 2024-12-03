// routes/headofficeRoutes.js
const express = require('express');
const router = express.Router();
const headofficeController = require('../controllers/headofficeController');

const authMiddleware = require('../middleware/authMiddleware');

// Apply the middleware to all routes in this router


// Route for getting dispatched data from suppliers
router.get('/dispatched/:schoolId',authMiddleware, headofficeController.getDispatchedData);


// Route for checking school inventory
router.get('/school-inventory/:schoolId',authMiddleware, headofficeController.getSchoolInventory);

module.exports = router;
