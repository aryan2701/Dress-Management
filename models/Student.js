// models/Student.js
const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true, // Ensure studentId is unique
  },
  name: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  // Add other fields if necessary
});

module.exports = mongoose.model('Student', StudentSchema);
