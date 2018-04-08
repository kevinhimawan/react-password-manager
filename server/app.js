var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')

var indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

// Database
const mongoose = require('mongoose')
const dbURL = `mongodb://kevin:12345@ds237379.mlab.com:37379/password_manager`
mongoose.connect(dbURL, (err) => {
  if (!err) {
    console.log('Database connected')
  }
})

app.use('/user', userRouter);

module.exports = app;