/**
 * Created by hackeris on 2016/11/13.
 */

var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');
var kue = require('kue');

var config = require('../config/config.json');

function compile(code, callback) {
  fs.writeFile(path.join(config.JUDGE_CWD, 'program.asm'), code, function () {
    exec('make', {cwd: config.JUDGE_CWD}, callback);
  });
}

function init() {
  var makefile =
    "all: clean program\n" +
    "\n" +
    "program: program.o\n" +
    "\tld -melf_i386 $+ -o $@\n" +
    "\n" +
    "program.o: program.asm\n" +
    "\tnasm -f elf $< -o $@\n" +
    "\n" +
    "clean:\n" +
    "\trm -vf program *.o\n";
  fs.writeFileSync(path.join(config.JUDGE_CWD, 'Makefile'), makefile);
}

function run(callback) {
  exec('./program', {cwd: config.JUDGE_CWD}, callback);
}

function judge(code, callback) {

  compile(code, function (error, stdout, stderr) {
    if (error) {
      callback({
        error: 'compilation error',
        stdout: stdout,
        stderr: stderr,
        code: error.code
      });
    } else {
      run(function (error, stdout, stderr) {
        callback({
          code: error ? error.code : 0,
          stdout: stdout,
          stderr: stderr
        });
      });
    }
  });
}

var jobs = kue.createQueue();

function enqueue(code, callback) {
  var job = jobs.create('code', {code: code});
  job.on('complete', function (result) {
    callback(result);
  }).on('failed', function () {
    callback('failed');
  });
  job.save();
}

jobs.process('code', function (job, done) {
  judge(job.data.code, function (result) {
    done(null, result);
  });
});


module.exports = {
  enqueue: enqueue,
  init: init
};