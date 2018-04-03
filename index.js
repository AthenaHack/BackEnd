require('dotenv').config();

var express = require('express');
var app = express();
var fs = require('fs');
var twilio = require('twilio');
var request = require('request');

var accountSid = process.env.ACCOUNTSID; // Your Account SID from www.twilio.com/console
var authToken = process.env.AUTHTOKEN;   // Your Auth Token from www.twilio.com/console

var client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;

app.get('/', function (req, res) {
  res.send("hello World");
})

request('https://api.mlab.com/api/1/databases/athenahacks/collections/students?apiKey='+process.env.API_KEY, { json: true }, (err, res, main) => {
  if (err) { return console.log(err); }
  console.log(main.length + " Success!") ;
  for(var i = 0; i < main.length; i++){
    client.messages.create({
        body: "This is an alert!! there is a shooting going on in the school. Stay safe.",
        to: main[i]["phoneNumber"],  // Text this number
        from: process.env.SENDERNUM // From a valid Twilio number
    })
    .then((message) => console.log(message.sid));
}
})

app.listen(process.env.PORT, function () {
  console.log('App listening on port ' + process.env.PORT + '!')
})
