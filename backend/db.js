const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        due_date TEXT,
        completed BOOLEAN DEFAULT 0,
        user_id INTEGER
    )`);

    db.run(`INSERT OR IGNORE INTO users (username, password) VALUES
        ('alice', 'alice123'),
        ('bob', 'bob123')`
    );

    db.run(`INSERT OR IGNORE INTO tasks (name, description, due_date, completed, user_id) VALUES
        ('Buy groceries', 'Milk, eggs, bread', '2025-08-06', 0, 1),
        ('Call Mom', 'Weekly check-in', '2025-08-05', 0, 1),
        ('Finish report', 'Due Monday', '2025-08-08', 0, 2)`
    );
    }
);

module.exports = db;