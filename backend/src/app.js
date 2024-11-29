const express = require('express');
const greetingRoutes = require('./routes/greetingRoutes');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/', greetingRoutes);

module.exports = app;