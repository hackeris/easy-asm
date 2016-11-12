/**
 * Created by hackeris on 2016/10/30.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
  username: String,
  email: {
    type: String,
    index: {unique: false}
  },
  password: {type: String, select: false},
  paid: {type: Boolean, default: false},
  createdAt: {type: Date, default: Date.now},
  __v: {type: Number, select: false}
});

userSchema.set('toObject', {getters: true});
mongoose.model('User', userSchema);