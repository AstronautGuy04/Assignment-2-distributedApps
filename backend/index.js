const express = require('express');
const greetingRoutes = require('./src/routes/greetingRoutes');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Mount the API routes
app.use('/api', greetingRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message
    });
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});