const express = require('express')
const app = express()

app.use(express.json())

// Test route
app.get('/test', (req, res) => {
    res.json({ message: 'API is working!' })
})

module.exports = app