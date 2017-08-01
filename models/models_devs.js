const mongoose = require ('mongoose');
const bcrypt = require ('bcryptjs');
const config = require ('../config/database');
var Schema = mongoose.Schema;


// Subject to change
var DevSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const Dev = module.exports = mongoose.model('Dev', DevSchema);

module.exports.getDevById = function(id, callback) {
  Dev.findById(id, callback);
}

module.exports.getDevByDevname = function(username, callback) {
  const query = {username: username}
  Dev.findOne(query, callback);
}

module.exports.addDev = function(newDev, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newDev.password, salt, function(err, hash) {
      newDev.password = hash;
      newDev.save(callback);
    });
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}
