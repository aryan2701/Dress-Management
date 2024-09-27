// app.js
const express = require('express');
const connectDB = require('./config/database');
const dotenv = require('dotenv');
const cors = require('cors');
const schoolRoutes = require('./routes/school'); 
const itemRoutes = require('./routes/itemRoutes');
const headofficeRoutes = require('./routes/headofficeRoutes');




// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/supplier', require('./routes/supplier'));
app.use('/school', require('./routes/school'));

app.use('/schools', schoolRoutes); 

app.use('/api', itemRoutes);


app.use('/headoffice', headofficeRoutes);



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
