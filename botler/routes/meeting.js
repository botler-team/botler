var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/nextuser', function(req, res, next) {
  var user = getNextUser();

  res.json(user);
});

module.exports = router;
