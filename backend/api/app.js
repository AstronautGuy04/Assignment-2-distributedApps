const express = require('express')
const app = express()

const greetings = [
    { timeOfDay: 'Morning', language: 'English', greetingMessage: 'Good morning', tone: 'Casual' },
    { timeOfDay: 'Morning', language: 'English', greetingMessage: 'I wish you a pleasant morning', tone: 'Formal' }
]

app.use(express.json())

app.get('/', (req, res) => {
    res.json({ message: 'API Working!' })
})

app.get('/test', (req, res) => {
    res.json({ greetings })
})

module.exports = app