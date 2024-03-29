const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { expressjwt } = require('express-jwt');
const { List } = require('../models/list');

function generateAccessToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET);
}

// log in
router.post('/', (req, res, next) => {
    const loginAttempt = req.body;

    User.findOne({ username: loginAttempt.username })
        .populate('lists')
        .then(user => {
            if (!user) {
                res.status(403);
                return next(new Error("Username or password are incorrect."));
            }

            user.checkPassword(loginAttempt.password, (err, isMatch) => {

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

        User.find({ username: userInput.username })
            .then(response => {
                if (response.length > 0) {
                    console.log(response);
                    res.status(400);
                    return next(new Error("That username already exists."));
                }

                const newUser = new User(req.body);

                newUser.save()
                    .then((response) => {
                        const token = generateAccessToken(newUser.withoutPassword());
                        res.status(201);
                        return res.send({ user: response, token });
                    })
                    .catch(err => {
                        res.status(500);
                        return next(new Error("Server error."));

                    });
            }).catch(err => {
                console.log(err);
                res.status(500);
                return next(new Error("Server error."));
            });
    } else {
        res.status(400);
        return res.send(new Error("Disallowed charecters detected."));
    }
});

// delete user account
router.delete("/delete", expressjwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }), async (req, res, next) => {
    console.log("req.auth ", req.auth);
    if (!req.auth) {
        res.status(400);
        return next(new Error("Authorization insufficient"));
    }

    try {
        await List.deleteMany({ user: req.auth._id });
        await User.deleteOne({ _id: req.auth._id });
        return res.status(200).send("User deleted successfully.");
    } catch (err) {
        res.status(400);
        return next(err);
    }
});


module.exports = router;