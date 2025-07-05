const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', (req, res) => {
    db.all(
        'SELECT * FROM tasks WHERE user_id = ?',
        [req.session.user.id],
        (err, rows) => {
            res.json(rows);
        }
    );
});

router.post('/', (req, res) => {
    const { name, description, due_date } = req.body;
    db.run(
        'INSERT INTO tasks (name, description, due_date, completed, user_id) VALUES (?, ?, ?, 0, ?)',
        [name, description, due_date, req.session.user.id],
        function (err) {
            res.json({ id: this.lastID });
        }
    );
});

router.patch('/:id', (req, res) => {
    const { name, description, due_date, completed } = req.body;
    db.run(
        'UPDATE tasks SET name = ?, description = ?, due_date = ?, completed = ? WHERE id = ? AND user_id = ?',
        [name, description, due_date, completed, req.params.id, req.session.user.id],
        () => res.sendStatus(200)
    );
});

router.delete('/:id', (req, res) => {
    db.run(
        'DELETE FROM tasks WHERE id = ? AND user_id = ?',
        [req.params.id, req.session.user.id],
        () => res.sendStatus(200)
    );
});

module.exports = router;