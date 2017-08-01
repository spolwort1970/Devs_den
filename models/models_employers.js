const mongoose = require ('mongoose');
const bcrypt = require ('bcryptjs');
const config = require ('../config/database');
var Schema = mongoose.Schema;


// Subject to change
var EmployerShema = new Schema({

name: {
  type: String
},
email: {
  type: String,
  required: true
},
password: {
  type: String,
  required: true
}
});

const User = module.exports = mongoose.model('Employers', DevSchema);

module.exports.getEmployerById = function(id, callback) {
  Dev.findById(id, callback);
}

module.exports.geEmployerByEmployername = function(employername, callback) {
  const query = {employername: employername}
  Employer.findOne(query, callback);
}
