const express = require('express');
const greetingRoutes = require('./src/routes/greetingRoutes');

const app = express();

// Middleware
app.use(express.json());

// API Routes
app.use('/api', greetingRoutes);

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'API is working!' });
});

// Start server (only when running locally)
if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

// Export for Vercel
module.exports = app;