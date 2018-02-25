//mongoDB setup
var mongoose = require('mongoose');
require('dotenv').config();

var uri = process.env.DB_URL;
mongoose.connect(uri);
var db = mongoose.connection;


db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
	console.log('MongoDB successfully  connected!');
});
