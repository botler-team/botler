var express = require('express');
var router = express.Router();
var github = require('octonode');

/* GET activities I've done listing. */
router.get('/done/:user', function(req, res, next) {
  var username = req.params.user;
  var client = github.client();
  var ghrepo = client.repo('botler-team/botler');
  var commits = [];
  var todaysDate = new Date();
  var callback = function(err,Httpresponse,body){
    for (i in Httpresponse){
      console.log(Httpresponse[i].commit.committer.login);
        var name = Httpresponse[i].committer.login;
        var date =  new Date(Httpresponse[i].commit.committer.date);
        var message = Httpresponse[i].commit.message

        if (name == username) {
            // Get commits from today
            if (date.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0)){
                commits.push({
                    name:name,
                    date:date,
                    message:message
                });
            }
        }
    }

    res.json(commits);
  };

  ghrepo.commits(callback); //array of commits
});

/* GET activities I've doing listing. */
router.get('/doing', function(req, res, next) {

  res.send('respond with a resource');
});

module.exports = router;
