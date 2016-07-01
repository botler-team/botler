var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/nextuser', function(req, res, next) {
  var user = getNextUser();

  res.json(user);
});

/* GET home page. */
router.get('/currentuser', function(req, res, next) {
  var user = partecipant[currentUserIndex].user.name;

  res.json(user);
});

router.post('/', function(req, res, next) {
  saveNotes(req.body);

  res.ok();
});


module.exports = router;
