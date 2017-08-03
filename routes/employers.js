var express = require ('express');
var router = express.Router();

//
router.post('/register', function(req, res, next) {
  res.send('employer registry');
});

router.post('/authenticate', function(req, res, next) {
  res.send('employer authentication');
});

router.get('/employer', function(req, res, next) {
  res.send('employer profile');
});



module.exports = router;

module.exports = router;
