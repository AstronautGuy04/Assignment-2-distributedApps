const express = require('express');
const greetingRoutes = require('./routes/greetingRoutes');

const app = express();

// Middleware
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Greetings API!' });
});

// API Routes - note we're not using /api prefix here
app.use('/', greetingRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: 'The requested endpoint does not exist'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message || 'Something went wrong!'
    });
});

module.exports = app;