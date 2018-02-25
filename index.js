require('dotenv').config();

var express = require('express');
var app = express();
var fs = require('fs');
var twilio = require('twilio');
var db = require('./database');
var request = require('request');

var accountSid = process.env.ACCOUNTSID; // Your Account SID from www.twilio.com/console
var authToken = process.env.AUTHTOKEN;   // Your Auth Token from www.twilio.com/console

var client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;

app.post('/', function (req, res) {console.log("get post req")
  request('https://api.mlab.com/api/1/databases/athenahacks/collections/students?apiKey=o2gZ1lynVLWp2xf46oNSrA0avHlH5rUI', { json: true }, (err, res, main) => {
    if (err) { return console.log(err); }
    console.log(main.length);
    for(var i = 0; i < main.length; i++){
      client.messages.create({
          body: "This is an alert. Stay away from the danger!!",
          to: main[i]["phoneNumber"],  // Text this number
          from: process.env.SENDERNUM // From a valid Twilio number
      })
      .then((message) => console.log(message.sid));
  }
})
})



app.listen(3000, function () {
  console.log('App listening on port 3000!')
})
