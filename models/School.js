// /models/School.js
const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
    username: { type: String, required: true },
    address: String,
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true // Ensure this is required
    }
});

module.exports = mongoose.model('School', schoolSchema);
