const express = require('express');
const router = express.Router();
const db = require('../database');
const { GreetingRequest, GreetingResponse } = require('../models/greeting');
const { validateGreetingRequest } = require('../middleware/validateRequest');

/**
 * POST /api/greet
 * Gets a greeting based on timeOfDay, language, and tone
 */
router.post('/greet', validateGreetingRequest, (req, res) => {
    const { timeOfDay, language, tone } = req.greetingRequest;

    // Query the database for the matching greeting
    db.get(
        `SELECT greetingMessage 
         FROM greetings 
         WHERE timeOfDay = ? AND language = ? AND tone = ?`,
        [timeOfDay, language, tone],
        (err, row) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({
                    error: 'Internal server error',
                    details: 'Failed to retrieve greeting'
                });
            }

            if (!row) {
                return res.status(404).json({
                    error: 'Greeting not found',
                    details: `No greeting found for timeOfDay: ${timeOfDay}, language: ${language}, tone: ${tone}`
                });
            }

            const response = new GreetingResponse(row.greetingMessage);
            res.json(response.toJson());
        }
    );
});

/**
 * GET /api/timesOfDay
 * Returns all available times of day
 */
router.get('/timesOfDay', (req, res) => {
    db.all(
        `SELECT DISTINCT timeOfDay 
         FROM greetings 
         ORDER BY 
            CASE timeOfDay 
                WHEN 'Morning' THEN 1 
                WHEN 'Afternoon' THEN 2 
                WHEN 'Evening' THEN 3 
            END`,
        [],
        (err, rows) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({
                    error: 'Internal server error',
                    details: 'Failed to retrieve times of day'
                });
            }

            res.json({
                timesOfDay: rows.map(row => row.timeOfDay)
            });
        }
    );
});

/**
 * GET /api/languages
 * Returns all supported languages
 */
router.get('/languages', (req, res) => {
    db.all(
        `SELECT DISTINCT language 
         FROM greetings 
         ORDER BY language`,
        [],
        (err, rows) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({
                    error: 'Internal server error',
                    details: 'Failed to retrieve languages'
                });
            }

            res.json({
                languages: rows.map(row => row.language)
            });
        }
    );
});

/**
 * GET /api/tones
 * Returns all supported tones (added for completeness)
 */
router.get('/tones', (req, res) => {
    db.all(
        `SELECT DISTINCT tone 
         FROM greetings 
         ORDER BY tone`,
        [],
        (err, rows) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({
                    error: 'Internal server error',
                    details: 'Failed to retrieve tones'
                });
            }

            res.json({
                tones: rows.map(row => row.tone)
            });
        }
    );
});

module.exports = router;