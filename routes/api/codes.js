/**
 * Created by hackeris on 2016/11/13.
 */

var express = require('express');
var mongoose = require('mongoose');

var judger = require('../../judger');

var router = express.Router();
var AsmCode = mongoose.model('AsmCode');

/* GET codes listing. */
router.get('/', async function (req, res) {
  var codes = await AsmCode.find({});
  res.send(codes);
});

router.post('/run', async function (req, res) {
  req.checkBody({
    code: {
      notEmpty: true,
      errorMessage: 'No code'
    }
  });
  var errors = req.validationErrors();
  if (errors) {
    res.status(400).send(errors);
  } else {
    // if (req.session.user) {
    await AsmCode.create({code: req.body.code});
    judger.enqueue(req.body.code, function (result) {
      res.send(result);
    });
    // } else {
    //   res.status(401).send({
    //     message: "Permission denied"
    //   });
    // }
  }
});

module.exports = {
  url: '/api/codes',
  router: router
};

