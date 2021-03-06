const mongoose = require ('mongoose');
const bcrypt = require ('bcryptjs');
const config = require ('../config/database');
var Schema = mongoose.Schema;

// Subject to change
var UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String
  },
  languages: [
    {
      name: String,
      level: String
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

UserSchema.pre('save', function(next) {
  var user = this;
  var SALT_FACTOR = 5;

  if(!user.isModified('password')){
    return next();
  }
  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if(err){
      return next(err);
    }
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if(err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);

  });
}

module.exports = mongoose.model('User', UserSchema);

