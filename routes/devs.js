const express = require ('express');
const passport = require ('passport');
const jwt = require ('jsonwebtoken');
const config = require ('../config/database');
const router = express.Router();

const Dev = require ('../models/models_devs');

// Register profile for devs
router.post('/register', (req, res, next) => {
  let newDev = new Dev({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  Dev.addDev(newDev, (err, dev)  => {
    if(err) {
      res.json({success: false, msg: 'Failed to register Dev'});
    } else {
      res.json({success: true, msg: 'Successfully registered Dev'});
    }
  });
});

// authentication for devs
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  Dev.getDevByDevname(username, (err, dev) => {
    if(err) throw err;
    if(!dev){
      return res.json({success:false, msg: 'Dev not found'});
    }

    Dev.comparePassword(password, dev.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch) {
        const token = jwt.sign(dev, config.secret, {
          expiresIn: 604800 // 1 week in seconds
        });

        res.json({
          success: true,
          token: 'JWT ' + token,
          dev: {
            id: dev._id,
            name: dev.name,
            username: dev.username,
            email: dev.email
          }
        });
      } else {
        return res.json({success:false, msg: 'wrong password'});
      }
    })
  })
});

// Dev profile page
router.get('/profile', passport.authenticate('jwt', {session:false}), function(req, res, next) {
  res.json({dev: req.user})
});



module.exports = router;
