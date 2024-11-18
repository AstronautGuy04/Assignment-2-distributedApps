const db = require('./database');

// Test query to verify database setup
function testDatabase() {
    // Query all greetings
    db.all('SELECT * FROM greetings', [], (err, rows) => {
        if (err) {
            console.error('Error querying database:', err);
            return;
        }
        
        console.log('Database test results:');
        console.log(`Found ${rows.length} greetings`);
        
        // Print some sample data
        console.log('\nSample greetings:');
        rows.slice(0, 3).forEach(row => {
            console.log(`${row.language} - ${row.timeOfDay} - ${row.tone}: ${row.greetingMessage}`);
        });
        
        // Test distinct values
        console.log('\nAvailable languages:');
        db.all('SELECT DISTINCT language FROM greetings', [], (err, languages) => {
            if (err) {
                console.error('Error querying languages:', err);
                return;
            }
            console.log(languages.map(l => l.language));
        });
    });
}

// Run the test
testDatabase();