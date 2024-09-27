// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');

  // Check if the Authorization header is present and formatted correctly
  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Remove 'Bearer ' from the token string
  const actualToken = token.split(' ')[1];

  try {
    // Verify the token using the JWT_SECRET from .env
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
    req.user = decoded; // Save the decoded token (user information) to req.user
    next(); // Continue to the next middleware or route handler
  } catch (e) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
