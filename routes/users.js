var express = require('express');
var passport = require('passport');
var router = express.Router();

var AuthenticationController = require('../controllers/authentication');
var JobController = require('../controllers/job-postings');
var passportService = require('../config/passport');

var requireAuth = passport.authenticate('jwt', {session: false});
var requireLogin = passport.authenticate('local', {session: false});

router.post('/register', AuthenticationController.register);
router.post('/login', requireLogin, AuthenticationController.login);


module.exports = router;
