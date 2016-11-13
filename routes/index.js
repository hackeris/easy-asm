var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.redirect('/run');
  // res.render('index', {title: 'Express'});
});

router.get('/login', function (req, res) {
  res.render('login');
});

router.get('/run', function (req, res) {
  res.render('run');
});

module.exports = {
  url: '/',
  router: router
};
