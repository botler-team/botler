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
router.get('/doing/:user', function(req, res, next) {
  var username = req.params.user;
  var client = github.client();
  var ghrepo = client.repo('botler-team/botler');
  var issues = [];
  var todaysDate = new Date();
  var callback = function(err,Httpresponse,body){
      for (i in Httpresponse){
          var name = Httpresponse[i].assignee.login;
          var state = Httpresponse[i].state;
          var title = Httpresponse[i].title;

          if (state == 'open') {
              if (name == username){
                  issues.push({
                      name:name,
                      state:state,
                      title:title
                  });
              }
          }

      }
      res.json(issues);

  }
  ghrepo.issues(callback); //array of commits

});

module.exports = router;
