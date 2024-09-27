const Inventory = require('../models/Inventory');
const Sale = require('../models/Sale');
const Dispatch = require('../models/Dispatch');
const User = require('../models/User');
const Student = require('../models/Student');

// Verify items and update inventory
exports.verifyItems = async (req, res) => {
  const { dispatchId, verifiedItems } = req.body;

  try {
    const dispatch = await Dispatch.findById(dispatchId);
    if (!dispatch) return res.status(404).json({ msg: 'Dispatch not found' });

    if (dispatch.schoolId.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized to verify this dispatch' });
    }

    dispatch.status = 'delivered';
    await dispatch.save();

    let inventory = await Inventory.findOne({ schoolId: req.user.id });
    if (!inventory) {
      inventory = new Inventory({ schoolId: req.user.id, items: [] });
    }

    verifiedItems.forEach((item) => {
      const existingItem = inventory.items.find(
        (i) => i.itemId.toString() === item.itemId && i.size === item.size
      );
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        inventory.items.push({
          itemId: item.itemId,
          size: item.size,
          quantity: item.quantity
        });
      }
    });

    await inventory.save();
    return res.json({ msg: 'Items verified and inventory updated', inventory });
  } catch (err) {
    console.error('Error verifying items:', err);
    return res.status(500).json({ msg: 'Server error while verifying items' });
  }
};

// Sell items to students and update inventory
exports.sellItemsToStudent = async (req, res) => {
  const { studentId, items } = req.body;

  try {
    const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);

    const sale = new Sale({
      schoolId: req.user.id,
      studentId,
      items,
      totalAmount,
    });
    await sale.save();

    const inventory = await Inventory.findOne({ schoolId: req.user.id });
    if (!inventory) {
      return res.status(400).json({ msg: 'Inventory not found' });
    }

    for (const soldItem of items) {
      const inventoryItem = inventory.items.find(
        (i) => i.itemId.toString() === soldItem.itemId && i.size === soldItem.size
      );

      if (inventoryItem && inventoryItem.quantity >= soldItem.quantity) {
        inventoryItem.quantity -= soldItem.quantity;
      } else {
        return res.status(400).json({ msg: `Insufficient inventory for item: ${soldItem.itemId}` });
      }
    }

    await inventory.save();

    return res.json({ msg: 'Sale completed and inventory updated', sale });
  } catch (err) {
    console.error('Error completing sale:', err);
    return res.status(500).json({ msg: 'Server error while completing sale' });
  }
};

// Process sale (new function)
exports.processSale = async (req, res) => {
  const { saleId } = req.params;

  try {
    const sale = await Sale.findById(saleId).populate('items.itemId', 'name price');
    if (!sale) return res.status(404).json({ msg: 'Sale not found' });

    return res.json(sale);
  } catch (err) {
    console.error('Error processing sale:', err);
    return res.status(500).json({ msg: 'Server error while processing sale' });
  }
};

// Get list of schools with _id and username
exports.getSchools = async (req, res) => {
  try {
    const schools = await User.find({ role: 'school' }).select('_id username');
    return res.json(schools);
  } catch (err) {
    console.error('Error fetching schools:', err);
    return res.status(500).json({ msg: 'Server error while fetching schools' });
  }
};

// Get pending dispatched items for a school
exports.getPendingDispatches = async (req, res) => {
  try {
    const dispatches = await Dispatch.find({
      schoolId: req.user.id,
      status: 'pending',
    }).populate('items.itemId', 'name price');

    if (!dispatches || dispatches.length === 0) {
      return res.status(404).json({ msg: 'No pending dispatches found' });
    }

    return res.json(dispatches);
  } catch (err) {
    console.error('Error fetching pending dispatches:', err);
    return res.status(500).json({ msg: 'Server error while retrieving dispatches' });
  }
};

// Get student details by ID
exports.getStudentById = async (req, res) => {
  const { studentId } = req.params;

  try {
    const student = await Student.findOne({ studentId });
    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }
    return res.json(student);
  } catch (err) {
    console.error('Error fetching student:', err);
    return res.status(500).json({ msg: 'Server error while fetching student' });
  }
};

// Get all items available in the inventory for the logged-in school
exports.getItems = async (req, res) => {
  try {
    const inventory = await Inventory.findOne({ schoolId: req.user.id }).populate('items.itemId', 'name price');
    
    if (!inventory) {
      return res.status(404).json({ msg: 'No items found' });
    }

    return res.json(inventory.items);
  } catch (err) {
    console.error('Error fetching items:', err);
    return res.status(500).json({ msg: 'Server error while fetching items' });
  }
};
