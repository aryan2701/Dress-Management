const Dispatch = require('../models/Dispatch');
const Inventory = require('../models/Inventory');
const Sales = require('../models/Sale');
const School = require('../models/School');
const User = require('../models/User'); // Ensure to import User model

// Fetch dispatched data for Head Office
exports.getDispatchedData = async (req, res) => {
    try {
        const { startDate, endDate, schoolId } = req.query;

        // Filtering conditions
        const filter = { status: 'delivered' };
        // Apply date range filters if provided
        if (startDate && endDate) {
            filter.dispatchedAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
        } else if (startDate) {
            filter.dispatchedAt = { $gte: new Date(startDate) };
        } else if (endDate) {
            filter.dispatchedAt = { $lte: new Date(endDate) };
        }
        // Filter by schoolId if provided
        if (schoolId) filter.schoolId = schoolId;

        // Fetch dispatched data with populated school and item details
        const dispatchedData = await Dispatch.find(filter)
            .populate('schoolId', 'username')  // Populating school information
            .populate('items.itemId', 'name price')  // Populating item information
            .sort({ dispatchedAt: 1 });  // Sort by dispatch date in ascending order

        // Aggregate dispatched data by date and school
        const response = dispatchedData.reduce((acc, curr) => {
            const date = curr.dispatchedAt.toISOString().split('T')[0]; // Format date to YYYY-MM-DD
            const schoolName = curr.schoolId ? curr.schoolId.username : 'Unknown School'; // Check if schoolId is not null

            // Check if an entry already exists for this date and school
            let entry = acc.find(item => item.date === date && item.school === schoolName);

            if (!entry) {
                // If no entry exists, create a new one
                entry = {
                    date,
                    school: schoolName,
                    dispatchedItems: [],
                    totalAmountForDay: 0
                };
                acc.push(entry);
            }

            // Loop through dispatched items and add to the list
            curr.items.forEach(item => {
                // Check if item and itemId are defined before accessing properties
                if (!item || !item.itemId) return;
                const totalPrice = item.quantity * item.price;
                entry.dispatchedItems.push({
                    itemName: item.itemId.name,
                    size: item.size,
                    quantity: item.quantity,
                    pricePerItem: item.price,
                    totalPrice
                });
                entry.totalAmountForDay += totalPrice;  // Accumulate total amount for the day
            });

            return acc;
        }, []);

        // Return aggregated response
        res.json(response);
    } catch (err) {
        console.error('Error fetching dispatched data:', err);  // Log the error
        res.status(500).json({ message: err.message });  // Send error response
    }
};

// Fetch school inventory data for Head Office
exports.getSchoolInventory = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const { schoolId } = req.params;

        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user || user.role !== 'headoffice') {
            return res.status(403).json({ message: 'Access denied: User not authorized' });
        }

        const school = await School.findById(schoolId);
        if (!school) return res.status(404).json({ message: 'School not found' });

        const dateFilter = {};
        if (startDate) {
            dateFilter.$gte = new Date(startDate);
        }
        if (endDate) {
            dateFilter.$lte = new Date(endDate);
        }

        const receivedItems = await Inventory.find({
            schoolId: schoolId,
            ...(Object.keys(dateFilter).length > 0 && { lastUpdated: dateFilter })
        }).populate('items.itemId', 'name');

        const soldItems = await Sales.find({
            schoolId: schoolId,
            ...(Object.keys(dateFilter).length > 0 && { soldAt: dateFilter })
        }).populate('items.itemId', 'name');

        const response = receivedItems.map(received => {
            return {
                schoolId: received.schoolId,
                items: received.items.map(item => {
                    // Calculate sold quantity and total revenue
                    const sold = soldItems.reduce((acc, soldItem) => {
                        // Check if soldItem and items are defined
                        if (!soldItem || !soldItem.items) return acc;

                        const soldItemDetails = soldItem.items.find(i => 
                            i.itemId && item.itemId && i.itemId.equals(item.itemId._id) && i.size === item.size
                        );

                        if (soldItemDetails) {
                            acc.quantitySold += soldItemDetails.quantity;
                            acc.priceSoldAt = soldItemDetails.price; // Assume price is consistent
                            acc.totalRevenue += soldItemDetails.quantity * soldItemDetails.price;
                        }
                        return acc;
                    }, { quantitySold: 0, priceSoldAt: 0, totalRevenue: 0 });

                    return {
                        itemName: item.itemId.name,
                        size: item.size,
                        quantityReceived: item.quantity,
                        quantitySold: sold.quantitySold,
                        priceSoldAt: sold.priceSoldAt,
                        totalRevenue: sold.totalRevenue
                    };
                }),
                lastUpdated: received.lastUpdated
            };
        });

        res.json({
            school: school.username,
            inventoryItems: response
        });
    } catch (err) {
        console.error('Error fetching school inventory:', err);
        res.status(500).json({ message: err.message });
    }
};
