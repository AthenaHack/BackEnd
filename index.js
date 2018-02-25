require('dotenv').config();

var express = require('express');
var app = express();
var fs = require('fs');
var twilio = require('twilio');

var accountSid = process.env.ACCOUNTSID; // Your Account SID from www.twilio.com/console
var authToken = process.env.AUTHTOKEN;   // Your Auth Token from www.twilio.com/console

var client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;

app.get('/', function (req, res) {
  res.send('Hello World!')
})

client.messages.create({
    body: "This is an alert. Stay away from the danger!!",
    to: '+19253395106',  // Text this number
    from: process.env.SENDERNUM // From a valid Twilio number
})
.then((message) => console.log(message.sid));

app.listen(3000, function () {
  console.log('App listening on port 3000!')
})
