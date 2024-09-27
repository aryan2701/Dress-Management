// routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const { getItems } = require('../controllers/itemController');

router.get('/items', getItems);

module.exports = router;
