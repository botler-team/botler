var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var activities = require('./routes/activities');
var meeting = require('./routes/meeting');
var github = require('octonode');
var sentiment = require('sentiment');

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
app.use('/meeting', meeting);

/* add here routes that colls functions */
app.use('/users', users);

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



/* Ethereum */
var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

//TODO: set the Abi
var loggerAbi = [{"constant":true,"inputs":[{"name":"","type":"uint16"}],"name":"participantsIndex","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"participantsList","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":false,"inputs":[{"name":"_participant","type":"string"}],"name":"addParticipant","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"arrayNotes","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"meetingDate","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint16"}],"name":"notesOf","outputs":[{"name":"","type":"uint16"}],"type":"function"},{"constant":false,"inputs":[{"name":"_participant","type":"string"},{"name":"index","type":"uint256"},{"name":"_note","type":"string"}],"name":"addNote","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"newAddress","type":"address"}],"name":"transferOwnership","outputs":[],"type":"function"},{"inputs":[{"name":"_meetingDate","type":"uint256"}],"type":"constructor"}];
//TODO: set the code of the contract
var datacodeInstance = '6060604052604051602080610ab9833981016040528080519060200190919050505b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b806001600050819055505b50610a51806100686000396000f360606040523615610095576000357c0100000000000000000000000000000000000000000000000000000000900480631c757585146100975780632820aece146100c3578063364de8b6146101475780633e3d375e1461019d57806341c0e1b51461022157806383289567146102305780639e6c1d7014610253578063c57e56f414610283578063f2fde38b1461032957610095565b005b6100ad6004808035906020019091905050610521565b6040518082815260200191505060405180910390f35b6100d96004808035906020019091905050610464565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156101395780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61019b6004808035906020019082018035906020019191908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505090909190505061061f565b005b6101b36004808035906020019091905050610562565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156102135780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61022e6004805050610341565b005b61023d600480505061045b565b6040518082815260200191505060405180910390f35b610269600480803590602001909190505061053c565b604051808261ffff16815260200191505060405180910390f35b6103276004808035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050909091908035906020019091908035906020019082018035906020019191908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509090919050506107f5565b005b61033f60048080359060200190919050506103d5565b005b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156103d257600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156104575780600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b5b50565b60016000505481565b600260005081815481101561000257906000526020600020900160005b915090508054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105195780601f106104ee57610100808354040283529160200191610519565b820191906000526020600020905b8154815290600101906020018083116104fc57829003601f168201915b505050505081565b60036000506020528060005260406000206000915090505481565b600460005060205280600052604060002060009150909054906101000a900461ffff1681565b600560005081815481101561000257906000526020600020900160005b915090508054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156106175780601f106105ec57610100808354040283529160200191610617565b820191906000526020600020905b8154815290600101906020018083116105fa57829003601f168201915b505050505081565b600260005080548060010182818154818355818115116106d0578183600052602060002091820191016106cf9190610652565b808211156106cb576000818150805460018160011615610100020316600290046000825580601f1061068457506106c1565b601f0160209004906000526020600020908101906106c091906106a2565b808211156106bc57600081815060009055506001016106a2565b5090565b5b5050600101610652565b5090565b5b5050509190906000526020600020900160005b8390919091509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061073257805160ff1916838001178555610763565b82800160010185558215610763579182015b82811115610762578251826000505591602001919060010190610744565b5b50905061078e9190610770565b8082111561078a5760008181506000905550600101610770565b5090565b5050506002600050805490506003600050600083604051808280519060200190808383829060006004602084601f0104600f02600301f15090500191505060405180910390206001900461ffff168152602001908152602001600020600050819055505b50565b6000600084604051808280519060200190808383829060006004602084601f0104600f02600301f15090500191505060405180910390206001900491506000600360005060008461ffff168152602001908152602001600020600050541415610862576108618561061f565b5b83600a8361ffff1606830301905082604051808280519060200190808383829060006004602084601f0104600f02600301f150905001915050604051809103902060019004600460005060008361ffff16815260200190815260200160002060006101000a81548161ffff021916908302179055506005600050805480600101828181548183558181151161098857818360005260206000209182019101610987919061090a565b80821115610983576000818150805460018160011615610100020316600290046000825580601f1061093c5750610979565b601f016020900490600052602060002090810190610978919061095a565b80821115610974576000818150600090555060010161095a565b5090565b5b505060010161090a565b5090565b5b5050509190906000526020600020900160005b8590919091509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106109ea57805160ff1916838001178555610a1b565b82800160010185558215610a1b579182015b82811115610a1a5782518260005055916020019190600101906109fc565b5b509050610a469190610a28565b80821115610a425760008181506000905550600101610a28565b5090565b5050505b505050505056';
var loggerAddress; //store the current contract address
var loggerContract; //store the current contract object
var contractUnderCreation = false;

/* Check the Eth connection  */
var isConnectedWeb3 = function(){
  if(!web3.isConnected()) {
    console.log('logger.js service::create: web3 is not connected to a node');
    return false;
  }
  return true;
};

/* Create a new logger contract */
var createLoggerContract = function(){
  if( !isConnectedWeb3() ) { throw new Error('Cannot create the contract: not connected to Eth');}
  /* Deploy contract */
  var loggerSmartContract = web3.eth.contract( loggerAbi );
  contractUnderCreation = true;
  var loggerInstance = loggerSmartContract.new(
    new Date().getTime(),
    {from: web3.eth.coinbase, data: datacodeInstance, gas: 1000000, value:1000},
    function(err, contract){
      if(err){
        console.log('Create weather contract error: ',err);
      }else{
        if(contract.address) {
          loggerAddress = contract.address;
          contractUnderCreation = false;
          console.log('Callback: Logger contract deployed at: ', loggerAddress);
        }
      }
    }
  ); /* synchronous call, but the address is not populated until the contract is mined */

  loggerContract = loggerInstance;
  return loggerContract;
}

var isLoggerContractReady = function(){
  return !contractUnderCreation;
}

//NOTE: throw error
/* Get the current logger contract */
var getLoggerContract = function(){
    if( isLoggerContractReady() ) {
      throw "Error getLoggerContract: LoggerContract is NOT ready";
    }

    if(!!loggerContract){ /* if not null */
      return loggerContract;
    }
    /* Try to retrieve the contract if it is already deployed */
    if( !isConnectedWeb3() ) { throw new Error('Cannot create the contract: not connected to Eth');}
    var loggerSmartContract = web3.eth.contract( loggerAbi );
    if( !!loggerAddress ){
      var code = web3.eth.getCode(loggerAddress); /* If the contract is deployed, it returns the hex code; otherwise '0x' */
      if(!!code && code != '0x'){ //TODO: check this /* If contract is deployed */
        loggerContract = loggerSmartContract.at(loggerAddress);
        return loggerContract;
      }
    }

    throw new Error('Contract not deployed');
};

//NOTE: throw error
/* Store the note of a partecipant of the standup meeting */
var logNoteEth = function(user, noteString){
  var MAX_STR_LEN = 3500;
  var MAX_STR_SPLIT = 10;
  if( !isConnectedWeb3() ) { console.log('Error Web3 Eth'); }
  var logger;
  try{
    logger = getLoggerContract();
  } catch(err) {
    console.log(err);
    logger = createLoggerContract();
  }
  var username = user;
  var note = noteString;

  sendM(note);

  // NOTE: required to slit notes in string of maximum 3500 characters to ensure that transaction do not go out of gas
  var i = 0;
  var lastCharForI = lastCharForI > note.length ? note.length: MAX_STR_LEN;

  do{
    try{
      logger.addNote(username, i, note.substring((i)*MAX_STR_LEN, lastCharForI), {from: web3.eth.coinbase, gas: 3999990, value:1});
    }catch(err){
      console.log(err);
    }
    i = i + 1;
    lastCharForI = (lastCharForI + MAX_STR_LEN > note.length) ? note.length: lastCharForI + MAX_STR_LEN;
  }while(i < note.length && i < MAX_STR_SPLIT); //NOTE: i<MAX_STR_SPLIT by contract requirment
};

//NOTE: throw error
/* Log partecipant to the standup meeting */
var logParticipantEth = function(user){
  if( !isConnectedWeb3() ) { console.log('Error Web3 Eth');}
  var logger;
  try{
    logger = getLoggerContract();
  } catch(err) {
    console.log(err);
    logger = createLoggerContract();
  }
  var username = user;
  logger.addParticipant(user, {from: web3.eth.coinbase, gas: 500000, value:1});
};

/* Reset of contract variables and creation of a new contract for the new meeting */
var newMeetingEth = function() {
  loggerAddress = null;
  loggerContract = null;
  createLoggerContract();
}
/* End Ethereum */





var RtmClient = require('@slack/client').RtmClient;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var MemoryDataStore = require('@slack/client').MemoryDataStore;
partecipant = [];
chan = null;
var token = "";

var rtm = new RtmClient(token, {
	logLevel: 'info',
	dataStore: new MemoryDataStore()
});

rtm.on(RTM_EVENTS.MESSAGE, function (message) {


  if(message.text.match(/.*start meeting*/)) {
    	console.log('find start meeting on the channel: ', message.channel);
      chan = message.channel;
    	initialize();

    	  rtm.sendMessage('Let start the meeting', message.channel, function messageSent() {

    });
  }
    if (message.text.match(/.*check in*/)) {
    	console.log('User checked ', message.user);
    	addMember(message);
      var user = rtm.dataStore.getUserById(message.user);
      var str = 'You are checked, '.concat( user.name).concat(' follow this link: http://localhost:3000/');
      rtm.sendMessage(str , message.channel, function messageSent() {
  	//TODO: ricevi il link
    });
  }

  if (message.text.match(/.*stop*/)) {
    console.log('Good Bye!');
   	rtm.sendMessage('Good Bye!', message.channel, function messageSent() {
  	//TODO: ricevi il link
    });}

    if (limitTalk(message) == true ){
      chan = message.channel;
      sendM("stai diventando prolisso!");
    }
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


function limitTalk(message){
  var countWord = (message.text.toString().split(/.\s/)).length;
  if (countWord > 30){
    //sendM('Stai diventando prolisso');
    console.log('Stai diventando prolisso..');
    return true;
  } else{
    console.log('limit words false');
    return false;

  }
}


function sendM(text){
  rtm.sendMessage(text, 'C170JBX8A', function messageSent() {
    console.log('written');
  });
}




rtm.start();
//sendM('provadjhf dfljdfadfa', chan);

/* Tournment manager */
currentUserIndex = 0;

getNextUser = function(){
    if (partecipant.length == 0) return null;

    currentUserIndex += 1;

  if(currentUserIndex + 1 > partecipant.length){
    return null;
  }

  //saveNotes();

  //TODO: send messages on Slack
  var convertToGit = function(name){
    switch (name) {
      case "margenti_reply":
      return "margentireply";

      case "bdelpizzo":
      return "bdelpizzo";

      case "giako":
      return "Giako";

      case "faffola":
      return "Faffola";

    }
  };
  var newname = convertToGit(partecipant[currentUserIndex].user.name);
  getGithubCommit(newname);
  getGithubIssue(newname);
  return partecipant[currentUserIndex].user.name;
}

saveNotes = function(note){
  //TODO:
  sendM(partecipant[currentUserIndex].user.name.concat(note));
  var r = sentiment(note.Interim);
  sendM(r.Comparative > 0 ? "Everybody is happy here!" : "Ok, let's try to chill out :)");
  try{
    logNoteEth(partecipant[currentUserIndex].user.name, note);
  }catch(err){
    console.log(err);
  }
}

/* End Tournment manager */

function sendMJ(intro, json) {
console.log(json);
  sendM(intro);

  for (i in json) { for (key in json[i]) {
    sendM(key + ": " + json[i][key]);}
  }
}

/* End Tournment manager */
function getGithubCommit(username){
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

    //res.json(commits);
    sendMJ("what you did yesterday", commits);

  };

  ghrepo.commits(callback);
}


function getGithubIssue(username){

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
      //res.json(issues);
      sendMJ("what you'll do today", issues);
  }
  ghrepo.issues(callback); //array of commits

}

module.exports = app;
