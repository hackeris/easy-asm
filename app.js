var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var expressValidator = require('express-validator');
var session = require('express-session');

var config = require('./config/config.json');

var recursiveWalkSync = require('./utils/recursive-walk');

var app = express();

app.use(logger('dev'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

// uncomment after placing your favicon in /public
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));

mongoose.Promise = global.Promise;
if (app.get('env') === 'development') {
  mongoose.set('debug', true);
}
mongoose.connect(config.MONGO_URI);
var models = path.join(__dirname, 'models');
fs.readdirSync(models)
  .filter(function (file) {
    return ~file.search(/^[^\.].*\.js$/);
  })
  .forEach(function (file) {
    require(path.join(models, file));
  });

app.use(expressValidator());

var routes = path.join(__dirname, 'routes');
recursiveWalkSync(routes, function (file) {
  var router = require(file);
  app.use(router.url, router.router);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
