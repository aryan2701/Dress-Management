// controllers/itemController.js
const Item = require('../models/Item');

// Get all items
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find().select('name _id'); // Fetch item names and IDs
    res.json(items);
  } catch (err) {
    console.error('Error fetching items:', err);
    res.status(500).json({ msg: 'Server error. Could not retrieve items.' });
  }
};
