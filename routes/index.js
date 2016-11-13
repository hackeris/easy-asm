var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', {title: 'Express'});
});

router.get('/login', function (req, res) {
  res.render('login');
});

router.get('/run', function (req, res) {
  if (req.session.user) {
    res.render('run');
  } else {
    res.redirect('/login');
  }
});

module.exports = {
  url: '/',
  router: router
};
