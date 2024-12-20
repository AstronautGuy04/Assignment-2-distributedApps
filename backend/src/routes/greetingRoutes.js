import express from 'express';
const router = express.Router();

// In-memory data store
const greetings = [
    // English greetings
    { timeOfDay: 'Morning', language: 'English', greetingMessage: 'Good morning', tone: 'Casual' },
    { timeOfDay: 'Morning', language: 'English', greetingMessage: 'I wish you a pleasant morning', tone: 'Formal' },
    { timeOfDay: 'Afternoon', language: 'English', greetingMessage: 'Good afternoon', tone: 'Casual' },
    { timeOfDay: 'Afternoon', language: 'English', greetingMessage: 'I hope you are having a wonderful afternoon', tone: 'Formal' },
    { timeOfDay: 'Evening', language: 'English', greetingMessage: 'Good evening', tone: 'Casual' },
    { timeOfDay: 'Evening', language: 'English', greetingMessage: 'I wish you a pleasant evening', tone: 'Formal' }
];

// Routes
// Test route for root endpoint
router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Greetings API' });
});

router.get('/timesOfDay', (req, res) => {
    const times = [...new Set(greetings.map(g => g.timeOfDay))];
    res.json({ timesOfDay: times });
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
        return res.status(400).json({
            error: 'Missing required fields'
        });
    }

    const greeting = greetings.find(g => 
        g.timeOfDay === timeOfDay && 
        g.language === language && 
        g.tone === tone
    );

    if (!greeting) {
        return res.status(404).json({
            error: 'Greeting not found',
            details: `No greeting found for timeOfDay: ${timeOfDay}, language: ${language}, tone: ${tone}`
        });
    }

    res.json({ greetingMessage: greeting.greetingMessage });
});

export default router