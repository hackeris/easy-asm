var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();
var User = mongoose.model('User');

router.post('/user', async function (req, res) {

  req.checkBody({
    password: {
      notEmpty: true,
      errorMessage: 'Invalid Password'
    },
    email: {
      notEmpty: true,
      isEmail: true,
      errorMessage: 'Invalid Email'
    }
  });
  var errors = req.validationErrors();
  if (errors) {
    res.status(400).send(errors);
  } else {
    var user = await User.findOne({email: req.body.email, password: req.body.password});
    if (user) {
      req.session.user = user;
      res.send(user);
    } else {
      res.status(401).send({
        message: 'Login failed'
      });
    }
  }
});

router.post('/user/register', async function (req, res) {

  req.checkBody({
    password: {
      notEmpty: true,
      errorMessage: 'Invalid Password'
    },
    email: {
      notEmpty: true,
      isEmail: true,
      errorMessage: 'Invalid email'
    }
  });
  var errors = req.validationErrors();
  if (errors) {
    res.status(400).send(errors);
  } else {
    var user = await User.findOne({email: req.body.email});
    if (user) {
      res.status(400).send({message: 'Already registered'});
    } else {
      user = await User.create(req.body);
      req.session.user = user;
      res.send({
        _id: user._id
      });
    }
  }
});

module.exports = {
  url: '/auth',
  router: router
};
