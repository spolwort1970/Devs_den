var express = require ('express');
var router = express.Router();

router.get('/register', function(req, res, next) {
  res.send('employer registry');
});

router.get('/authenticate', function(req, res, next) {
  res.send('employer authentication');
});

module.exports = router;
