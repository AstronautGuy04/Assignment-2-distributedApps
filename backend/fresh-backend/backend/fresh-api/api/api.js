const express = require('express')
const app = express()
app.get('/test', (req, res) => res.json({ msg: 'Working!' }))
module.exports = app