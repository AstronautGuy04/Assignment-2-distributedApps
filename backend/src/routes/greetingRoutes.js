const express = require('express');
const router = express.Router();
const { initializeDatabase } = require('../database');

// GET /timesOfDay
router.get('/timesOfDay', async (req, res) => {
    try {
        const db = await initializeDatabase();
        db.all('SELECT DISTINCT timeOfDay FROM greetings ORDER BY timeOfDay', [], (err, rows) => {
            if (err) {
                res.status(500).json({ error: 'Database error', details: err.message });
                return;
            }
            res.json({ timesOfDay: rows.map(row => row.timeOfDay) });
            db.close();
        });
    } catch (error) {
        res.status(500).json({ error: 'Database initialization error', details: error.message });
    }
});

// GET /languages
router.get('/languages', async (req, res) => {
    try {
        const db = await initializeDatabase();
        db.all('SELECT DISTINCT language FROM greetings ORDER BY language', [], (err, rows) => {
            if (err) {
                res.status(500).json({ error: 'Database error', details: err.message });
                return;
            }
            res.json({ languages: rows.map(row => row.language) });
            db.close();
        });
    } catch (error) {
        res.status(500).json({ error: 'Database initialization error', details: error.message });
    }
});

// GET /tones
router.get('/tones', async (req, res) => {
    try {
        const db = await initializeDatabase();
        db.all('SELECT DISTINCT tone FROM greetings ORDER BY tone', [], (err, rows) => {
            if (err) {
                res.status(500).json({ error: 'Database error', details: err.message });
                return;
            }
            res.json({ tones: rows.map(row => row.tone) });
            db.close();
        });
    } catch (error) {
        res.status(500).json({ error: 'Database initialization error', details: error.message });
    }
});

// POST /greet
router.post('/greet', async (req, res) => {
    const { timeOfDay, language, tone } = req.body;

    if (!timeOfDay || !language || !tone) {
        return res.status(400).json({
            error: 'Missing required fields'
        });
    }

    try {
        const db = await initializeDatabase();
        db.get(
            'SELECT greetingMessage FROM greetings WHERE timeOfDay = ? AND language = ? AND tone = ?',
            [timeOfDay, language, tone],
            (err, row) => {
                if (err) {
                    res.status(500).json({ error: 'Database error', details: err.message });
                    return;
                }
                if (!row) {
                    res.status(404).json({
                        error: 'Greeting not found',
                        details: `No greeting found for timeOfDay: ${timeOfDay}, language: ${language}, tone: ${tone}`
                    });
                    return;
                }
                res.json({ greetingMessage: row.greetingMessage });
                db.close();
            }
        );
    } catch (error) {
        res.status(500).json({ error: 'Database initialization error', details: error.message });
    }
});

module.exports = router;