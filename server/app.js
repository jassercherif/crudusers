var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const routerUsers = require('./routes/users.route');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// CORS configuration
//app.use(cors());

app.use(cors());
// MongoDB connection
mongoose.connect(process.env.ATLAS_URI)
    .then(() => console.log('DB Connected'))
    .catch(err => console.log(err.message));

// Define routes
app.use('/api', routerUsers);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;
