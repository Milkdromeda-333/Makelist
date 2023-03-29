const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const mongoose = require('mongoose');
const { expressjwt } = require('express-jwt');
const path = require("path");
const port = process.env.PORT || 3000;

// routes
const authRoute = require('./routes/auth');
const listRoute = require('./routes/list');

// middleware

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
// this serves static files
app.use(express.static(path.join(__dirname, "client", "dist")));

app.use('/auth', authRoute);
app.use('/api', expressjwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }));
app.use('/api/lists', listRoute);

// error handler
app.use((err, req, res, next) => {
    console.log(err);
    if (err.name === 'UnauthorizedError') {
        res.status(err.status);
    }
    return res.send({ errMsg: err.message });
});

// this sends the client to the index page if it is passed a route it does not support
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// port listener and connect to db
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to database');

        app.listen(port, (err) => {
            if (err) {
                throw new Error(err);
            }
            console.log('Server is Successfully Running, and App is listening on port ' + process.env.PORT);
        });
    })
    .catch(err => {
        console.error(err);
    });