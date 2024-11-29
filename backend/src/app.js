const express = require('express');
const greetingRoutes = require('./routes/greetingRoutes');

const app = express();

// Middleware
app.use(express.json());

// API Routes
app.use('/', greetingRoutes);

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Greetings API!' });
});

module.exports = app;