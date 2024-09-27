const Dispatch = require('../models/Dispatch');
const Item = require('../models/Item');
const User = require('../models/User');

// Dispatch items to a school
exports.dispatchItems = async (req, res) => {
  const { schoolId, items } = req.body;

  // Validate required fields
  if (!schoolId || !items || items.length === 0) {
    return res.status(400).json({ msg: 'Please provide schoolId and at least one item.' });
  }

  // Validate each item for necessary fields
  for (const item of items) {
    if (!item.itemId || !item.size || !item.quantity || item.price === undefined) {
      return res.status(400).json({ msg: 'Each item must have an itemId, size, quantity, and price.' });
    }

    // Check if the item exists in the database
    const existingItem = await Item.findById(item.itemId);
    if (!existingItem) {
      return res.status(404).json({ msg: `Item with id ${item.itemId} does not exist.` });
    }
  }

  try {
    // Create a new Dispatch object
    const dispatch = new Dispatch({
      supplierId: req.user.id, // req.user is added by the auth middleware after token verification
      schoolId,
      items,
    });

    // Save the dispatch to the database
    await dispatch.save();

    res.status(201).json({ msg: 'Items dispatched successfully', dispatch }); // Return dispatch details in response
  } catch (err) {
    console.error('Error dispatching items:', err); // Log the actual error for debugging
    res.status(500).json({ msg: 'Server error. Could not dispatch items.' }); // More informative error message
  }
};

// List all dispatched items for the supplier
exports.getDispatchedItems = async (req, res) => {
  try {
    // Fetch dispatches from the database for the supplier
    const dispatches = await Dispatch.find({ supplierId: req.user.id })
      .populate('schoolId', 'username') // Populate schoolId with school username or name
      .populate({
        path: 'items.itemId',
        select: 'name price', // Include name and price in the populated fields
      });

    // Check if any dispatches exist
    if (!dispatches || dispatches.length === 0) {
      return res.status(404).json({ msg: 'No dispatched items found.' });
    }

    res.status(200).json(dispatches); // Return the list of dispatched items
  } catch (err) {
    console.error('Error fetching dispatched items:', err); // Log the actual error for debugging
    res.status(500).json({ msg: 'Server error. Could not retrieve dispatched items.' });
  }
};



