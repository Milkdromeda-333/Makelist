const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const mongoose = require('mongoose');
const { expressjwt } = require('express-jwt');

// routes
const authRoute = require('./routes/auth');
const listRoute = require('./routes/list');

// middleware

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/auth', authRoute);
app.use('/api', expressjwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }));
app.use('/api/list', listRoute);

// error handler
app.use((err, req, res, next) => {
    console.log(err);
    if (err.name === 'UnauthorizedError') {
        res.status(err.status);
    }
    return res.send({ errMsg: err.message });
});

// port listener
app.listen(process.env.PORT, (err) => {
    if (err) {
        throw new Error(err);
    }
    // connect to db
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('Connected to database');
        })
        .catch(err => {
            console.error(err);
        });

    console.log('Server is Successfully Running, and App is listening on port ' + process.env.PORT);
});