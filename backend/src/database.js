const sqlite3 = require('sqlite3');
const path = require('path');

const initializeDatabase = () => {
    const db = new sqlite3.Database(':memory:');

    const initSql = `
        CREATE TABLE IF NOT EXISTS greetings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timeOfDay TEXT NOT NULL,
            language TEXT NOT NULL,
            greetingMessage TEXT NOT NULL,
            tone TEXT NOT NULL
        );

        INSERT OR IGNORE INTO greetings (timeOfDay, language, greetingMessage, tone) VALUES
            ('Morning', 'English', 'Good morning', 'Casual'),
            ('Morning', 'English', 'I wish you a pleasant morning', 'Formal'),
            ('Afternoon', 'English', 'Good afternoon', 'Casual'),
            ('Afternoon', 'English', 'I hope you are having a wonderful afternoon', 'Formal'),
            ('Evening', 'English', 'Good evening', 'Casual'),
            ('Evening', 'English', 'I wish you a pleasant evening', 'Formal'),

            ('Morning', 'French', 'Bonjour', 'Casual'),
            ('Morning', 'French', 'Je vous souhaite une bonne matinée', 'Formal'),
            ('Afternoon', 'French', 'Bon après-midi', 'Casual'),
            ('Afternoon', 'French', 'Je vous souhaite un bon après-midi', 'Formal'),
            ('Evening', 'French', 'Bonsoir', 'Casual'),
            ('Evening', 'French', 'Je vous souhaite une bonne soirée', 'Formal'),

            ('Morning', 'Spanish', 'Buenos días', 'Casual'),
            ('Morning', 'Spanish', 'Le deseo muy buenos días', 'Formal'),
            ('Afternoon', 'Spanish', 'Buenas tardes', 'Casual'),
            ('Afternoon', 'Spanish', 'Le deseo muy buenas tardes', 'Formal'),
            ('Evening', 'Spanish', 'Buenas noches', 'Casual'),
            ('Evening', 'Spanish', 'Le deseo muy buenas noches', 'Formal');
    `;

    return new Promise((resolve, reject) => {
        db.exec(initSql, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(db);
            }
        });
    });
};

module.exports = { initializeDatabase };