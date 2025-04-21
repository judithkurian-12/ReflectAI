// Created by Judith Kurian (B00940475)

require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
const routes = require('./routes/index');
app.use('/api', routes);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
