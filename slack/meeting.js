var RtmClient = require('@slack/client').RtmClient;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var MemoryDataStore = require('@slack/client').MemoryDataStore;
var partecipant;

var token = "";

var rtm = new RtmClient(token, {
	logLevel: 'info',
	dataStore: new MemoryDataStore(),
	autoReconnect: true
});


rtm.on(RTM_EVENTS.MESSAGE, function (message) {
  


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


