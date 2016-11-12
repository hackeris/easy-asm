/**
 * Created by hackeris on 2016/10/30.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var asmCodeSchema = Schema({
  code: String,
  user: {type: Schema.Types.ObjectId},
  createdAt: {type: Date, default: Date.now},
  __v: {type: Number, select: false}
});

asmCodeSchema.set('toObject', {getters: true});
mongoose.model('AsmCode', asmCodeSchema);