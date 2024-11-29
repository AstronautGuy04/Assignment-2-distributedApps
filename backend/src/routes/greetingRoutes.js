const express = require('express');
const router = express.Router();

// In-memory data
const greetings = [
    { timeOfDay: 'Morning', language: 'English', greetingMessage: 'Good morning', tone: 'Casual' },
    { timeOfDay: 'Morning', language: 'English', greetingMessage: 'I wish you a pleasant morning', tone: 'Formal' },
    // Add other greetings...
];

router.get('/timesOfDay', (req, res) => {
    const timesOfDay = [...new Set(greetings.map(g => g.timeOfDay))];
    res.json({ timesOfDay });
});

router.get('/languages', (req, res) => {
    const languages = [...new Set(greetings.map(g => g.language))];
    res.json({ languages });
});

router.get('/tones', (req, res) => {
    const tones = [...new Set(greetings.map(g => g.tone))];
    res.json({ tones });
});

router.post('/greet', (req, res) => {
    const { timeOfDay, language, tone } = req.body;
    
    if (!timeOfDay || !language || !tone) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const greeting = greetings.find(g => 
        g.timeOfDay === timeOfDay && 
        g.language === language && 
        g.tone === tone
    );

    if (!greeting) {
        return res.status(404).json({
            error: 'Not found',
            message: `No greeting found for timeOfDay: ${timeOfDay}, language: ${language}, tone: ${tone}`
        });
    }

    res.json({ greetingMessage: greeting.greetingMessage });
});

module.exports = router;