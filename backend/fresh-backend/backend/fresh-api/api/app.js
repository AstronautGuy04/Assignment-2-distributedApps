const express = require('express')
const app = express()

app.use(express.json())

// Simple test route
app.get('/test', (req, res) => {
    res.json({ message: 'API Working!' })
})

module.exports = app