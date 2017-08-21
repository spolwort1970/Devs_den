const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/model_users');



// Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    role: req.body.role
  });

  User.addUser(newUser, (err, user) => {
    if(err){
      res.json({success: false, msg:'Failed to register user'});
    } else {
      res.json({success: true, msg:'User registered'});
    }
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(user, config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            role: user.role
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

// get developer profile (/users/profile/developer)
router.get('/profile/developer', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  if(req.user.role === 'employer') {
    res.status(403).json({success: false, message: 'Not authorized.'})
    next();
  }
  res.json({user: req.user});
});

// get employer profile (users/profile/employer)
router.get('/profile/employer', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  if(req.user.role === 'developer') {
    res.status(403).json({success: false, message: 'Not authorized.'})
    next();
  }
  res.json({user: req.user});
})

router.put('/profile/:id', (req, res, next) => {
  User.findOne({_id: req.params.id}, function (err, user) {
    if (err) {
      res.status(500).send(err);
    } else {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.username = req.body.username || user.username;
      user.password = req.body.password || user.password;

      user.save(function (err, user) {
        if(err) {
          res.status(500).send(err)
        }
        res.json(user);
      });
    }
  });

});



router.delete('/profile/:id', (req, res, next) => {
  User.findOne({_id: req.params.id}).remove(function(err, user) {
    if (err) {
      res.json({success: false, message: 'Cannot delete'})
    }
    res.json({success: true, message: 'Deleted'})
  })
})

module.exports = router;
