const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolController');
const authMiddleware = require('../middleware/authMiddleware');

// Verify and update inventory
router.post('/verify', authMiddleware, schoolController.verifyItems);

// Sell items to students
router.post('/sell', authMiddleware, schoolController.sellItemsToStudent);

// Process sale (new route)
router.get('/process-sale/:saleId', authMiddleware, schoolController.processSale);

// Get list of schools with _id and username
router.get('/', authMiddleware, schoolController.getSchools);

// Get pending dispatched items for a school
router.get('/pending-dispatches', authMiddleware, schoolController.getPendingDispatches);

// Get student by ID
router.get('/student/:studentId', authMiddleware, schoolController.getStudentById);

// Get items
router.get('/items', authMiddleware, schoolController.getItems);

router.get('/school-inventory/:schoolId', authMiddleware, schoolController.getSchoolInventoryschool);

module.exports = router;
