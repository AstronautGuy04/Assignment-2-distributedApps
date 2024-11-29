const express = require('express');

const app = express();
app.use(express.json());

// Test route
app.get('/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Greetings API!' });
});

module.exports = app;