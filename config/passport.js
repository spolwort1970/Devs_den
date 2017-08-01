const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const Dev = require('../models/models_devs');
const config = require('../config/database');

module.exports = function(passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    Dev.getDevById(jwt_payload._doc._id, (err, dev) => {
      if(err) {
        return done(err, false);
      }
      if(dev) {
        return done(null, dev);
      } else {
        return done(null, false);
      }
    });
  }));
}
