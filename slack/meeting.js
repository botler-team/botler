var RtmClient = require('@slack/client').RtmClient;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var MemoryDataStore = require('@slack/client').MemoryDataStore;


var token = "xoxb-41008753600-dYXF74jVPvm8Ay6y09sYRZvb";

var rtm = new RtmClient(token, {
	logLevel: 'info',
	dataStore: new MemoryDataStore(),
	autoReconnect: true
});


rtm.on(RTM_EVENTS.MESSAGE, function (message) {
  
var user = rtm.dataStore.getUserById(message.user)
console.log(user.name);

if(message.text.match(/.*start meeting*/)) {
  	console.log('find start meeting on the channel: ', message.channel);
  	  rtm.sendMessage('Let start the meeting', message.channel, function messageSent() {

  });
}
  if (message.text.match(/.*check in*/)) {
  	console.log('User checked ', message.user);
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

rtm.start();

