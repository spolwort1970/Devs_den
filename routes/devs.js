var express = require ('express');
var router = express.Router();

router.get('/register', function(req, res, next) {
  res.send('developer registry');
});

router.get('/authenticate', function(req, res, next) {
  res.send('developer authentication');
});


module.exports = router;
