var RtmClient = require('@slack/client').RtmClient;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;

var token = "xoxb-41008753600-z2VsmKrZLAVHbrRn64EKYA0J";

var rtm = new RtmClient(token, {logLevel: 'info'});
rtm.start();


rtm.on(RTM_EVENTS.MESSAGE, function (message) {
  
  if(message.text.match(".*start meeting.*") {
  	console.log("if is true");
  }
  else {
  	console.log("if is false");
  }

});



console.log('User ID: ' , message.user);
  console.log('Messaggio: ' , message.text);



rtm.on(CLIENTS)


rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
  console.log(`Logged in as of  but not yet connected to a channel`);
});

 if(message.text===".*start meeting.*")


//regex CIAO aaa
if(s.match(/.CIAO\s[a-zA-Z]/)) console.log("TRUE")