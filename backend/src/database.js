const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// Database file path
const dbPath = path.resolve(__dirname, 'greetings.sqlite');
// SQL initialization file path
const initSqlPath = path.resolve(__dirname, 'database', 'init.sql');

function initializeDatabase() {
    // Create a new database connection
    const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error('Error connecting to database:', err);
            return;
        }
        console.log('Connected to SQLite database');
    });

    // Check if initialization SQL file exists
    if (fs.existsSync(initSqlPath)) {
        // Read and execute initialization SQL
        const initSql = fs.readFileSync(initSqlPath, 'utf-8');
        
        // Run initialization SQL in a transaction
        db.serialize(() => {
            db.exec('BEGIN TRANSACTION');
            
            db.exec(initSql, (err) => {
                if (err) {
                    console.error('Error initializing database:', err);
                    db.exec('ROLLBACK');
                    return;
                }
                
                db.exec('COMMIT');
                console.log('Database initialized successfully');
            });
        });
    } else {
        console.error('Database initialization SQL file not found');
    }

    return db;
}

// Create and initialize the database
const db = initializeDatabase();

// Export the database connection
module.exports = db;