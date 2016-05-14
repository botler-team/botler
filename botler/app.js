var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var activities = require('./routes/activities');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/activities', activities);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});





var RtmClient = require('@slack/client').RtmClient;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var MemoryDataStore = require('@slack/client').MemoryDataStore;
var partecipant;
var channel;

var token = "";

var rtm = new RtmClient(token, {
	logLevel: 'info',
	dataStore: new MemoryDataStore(),
	autoReconnect: true
});

rtm.on(RTM_EVENTS.MESSAGE, function (message) {
  channel = !channel?message.channel:channel;
  if(message.text.match(/.*start meeting*/)) {
    	console.log('find start meeting on the channel: ', message.channel);
    	initialize();
    	rtm.sendMessage('Let start the meeting', message.channel, function messageSent() {
    });
  }
    if (message.text.match(/.*check in*/)) {
    	console.log('User checked ', message.user);
    	addMember(message);
      rtm.sendMessage('You are checked, follow this link ', message.channel, function messageSent() {
  	//TODO: ricevi il link
    });
  }

  if (message.text.match(/.*stop*/)) {
    console.log('Good Bye!');
   	rtm.sendMessage('Good Bye!', message.channel, function messageSent() {
  	//TODO: ricevi il link
    });}

});

function initialize() {
	partecipant = [];
}

function sendMessage(text){
  rtm.sendMessage(text, channel, function messageSent() {
    console.log('written');
  });
}

function addMember(message){
	var user = rtm.dataStore.getUserById(message.user);
	var exists = false;
	for(var i=0; i<partecipant.length && exists==false;i++)
		if(partecipant[i].user==user) exists=true;
	if(exists==false) {
  	partecipant.push({user:user, channel:message.channel});
  } else console.log("user aldready exists");
}

rtm.start();






module.exports = app;
