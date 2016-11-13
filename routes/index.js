var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', {title: 'Express'});
});

router.get('/run', function (req, res) {
  res.render('run');
});

module.exports = module.exports = {
  url: '/',
  router: router
};
