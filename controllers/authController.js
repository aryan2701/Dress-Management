// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

// Register a new user
exports.register = async (req, res) => {
  const { username, password, role, school } = req.body;

  // Basic role validation
  const validRoles = ['supplier', 'school', 'headoffice'];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ msg: 'Invalid role provided' });
  }

  try {
    // Check if user already exists
    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    // Hash the password and save user
    const hashedPassword = await bcrypt.hash(password, 12);
    user = new User({ username, password: hashedPassword, role, school });
    await user.save();
    
    res.json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Login user
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        school: user.school || null
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
