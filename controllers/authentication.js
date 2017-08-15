var jwt = require('jsonwebtoken');
var User = require('../models/model_users');
var authConfig = require('../config/auth');

function generateToken(user) {
  return jwt.sign(user, authConfig.secret, {
    expiresIn: 10080
  });
}

function setUserInfo(request){
  return {
    _id: request._id,
    name: request.name,
    username: request.username,
    email: request.email,
    role: request.role
  };
}

exports.login = function(req, res, next) {
  var userInfo = setUserInfo(req.user);

  res.status(200).json({
    token: 'JWT ' + generateToken(userInfo),
    user: userInfo
  });
}

exports.register = function(req, res, next) {

  User.findOne({username: req.body.username}, function(err, existingUser) {
    if(err) {
      return next(err);
    }
    if(existingUser) {
      return res.status(422).send({error: 'That username already exists.'});
    }

    var user = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    });

    user.save(function(err, user) {
      if(err){
        return next(err);
      }
      var userInfo = setUserInfo(user);

      res.status(201).json({
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
      })
    });
  });

}

exports.roleAuthorization = function(roles) {
  return function(req, res, next) {
    var user = req.user;

    User.findById(user._id, function(err, foundUser) {
      if(err){
        res.status(422).json({error: 'No User Found'});
      }
      if(roles.indexOf(foundUser.role) > -1) {
        return next();
      }
      res.status(401).json({error: 'You are not authorized to view this content'});
      return next('Unauthorized');
    });
  }
}
