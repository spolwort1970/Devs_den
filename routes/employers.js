var express = require ('express');
var router = express.Router();

router.get('/employers', function(req, res, next) {
  res.send('Future Employers API');
});

module.exports = router;
