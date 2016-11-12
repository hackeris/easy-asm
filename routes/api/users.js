var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();
var User = mongoose.model('User');

/* GET users listing. */
router.get('/', async function (req, res) {
  var users = await User.find({});
  res.send(users);
});

router.delete('/', async function (req, res) {
  res.send({
    message: 'Not implemented'
  });
});

module.exports = {
  url: '/api/users',
  router: router
};
