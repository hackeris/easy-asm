/**
 * Created by hackeris on 2016/10/31.
 */

var fs = require('fs');
var path = require('path');
function recursiveReadDirSync(dir, callback) {
  fs.readdirSync(dir)
    .forEach(function (file) {
      if (fs.statSync(path.join(dir, file)).isDirectory()) {
        recursiveReadDirSync(path.join(dir, file), callback);
      } else {
        callback(path.join(dir, file));
      }
    });
}
module.exports = recursiveReadDirSync;
