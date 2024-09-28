// app.js
const express = require('express');
const connectDB = require('./config/database');
const dotenv = require('dotenv');
const cors = require('cors');
const schoolRoutes = require('./routes/school'); 
const itemRoutes = require('./routes/itemRoutes');
const headofficeRoutes = require('./routes/headofficeRoutes');
const authRoutes = require('./routes/auth'); // Make sure to import auth routes
const supplierRoutes = require('./routes/supplier'); // Ensure supplier routes are imported

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this specific origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  credentials: true // Enable credentials if needed
}));

// Routes
app.use('/auth', authRoutes); // Auth routes
app.use('/supplier', supplierRoutes); // Supplier routes
app.use('/school', schoolRoutes); // School routes
app.use('/api', itemRoutes); // Item routes
app.use('/headoffice', headofficeRoutes); // Head office routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
