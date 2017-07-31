var express = require ('express');
var router = express.Router();

router.get('/users', function(req, res, next) {
  res.send('Future Users API');
});

module.exports = router;
