// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },  // Added unique: true to ensure usernames are unique
  password: { type: String, required: true },
  role: { 
    type: String, 
    required: true,
    enum: ['supplier', 'school', 'headoffice']  // Enforce valid roles
  },
  school: { 
    type: String, 
    default: null  // Only required if role is 'school', otherwise can be null
  }
});

module.exports = mongoose.model('User', userSchema);
