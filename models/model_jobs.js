var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var JobSchema = new Schema({
  title: String,
  type: String,
  salary: Number,
  startDate: Date,
  endDate: Date,
  details: String,
  createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Jobs', JobSchema);
