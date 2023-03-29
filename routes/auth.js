const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

function generateAccessToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET);
}

// log in
router.post('/', (req, res, next) => {
    const user = req.body;

    User.findOne({ username: user.username })
        .populate('lists')
        .then(user => {
            if (!user) {
                res.status(403);
                return next(new Error("Username or password are incorrect."));
            }

            user.checkPassword(user.password, (err, isMatch) => {
                if (err) {
                    res.status(500);
                    return next(err);
                }

                if (!isMatch) {
                    res.status(400);
                    return next(new Error("Username or password are incorrect."));
                }

                const token = generateAccessToken(user.withoutPassword());
                res.status(200);
                return res.send({ token, user: user.withoutPassword() });
            });
        }).catch(err => {
            res.status(500);
            return next(new Error(err));
        });
});

// create new user
router.post('/new-user', (req, res, next) => {
    const userInput = req.body;

    // checks for disallowed charecters
    if (userInput.username.match(/^[0-9a-zA-Z]{1,16}$/)) {

        const newUser = new User(req.body);

        newUser.save()
            .then((response) => {
                const token = generateAccessToken(newUser.withoutPassword());
                res.status(201);
                return res.send({ user: response, token });
            })
            .catch(err => {
                res.status(500);
                return next(err);
            });
    } else {
        res.status(400);
        return res.send(new Error("Disallowed charecters detected."));
    }
});


module.exports = router;