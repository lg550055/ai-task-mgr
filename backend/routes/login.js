const express = require('express');
const db = require('../db');
const router = express.Router();


router.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.get(
        'SELECT * FROM users WHERE username = ? AND password = ?',
        [username, password], (err, user) => {
            if (user) {
                req.session.user = user;
                res.json({ username: user.username });
            } else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
        }
    );
});

router.post('/logout', (req, res) => {
    req.session.destroy(() => res.sendStatus(200));
});

module.exports = router;