'use strict';

// MODULE DEPENDENCIES

var init = require('./config/init')(),
	config = require('./config/config'),
	mongoose = require('mongoose'),
	chalk = require('chalk');

// MAIN APPLICATION ENTRY FILE

// bootstrap db connection
var db = mongoose.connect(config.db, function(err) {
	if (err) {
		console.error(chalk.red('Could not connect to MongoDB!'));
		console.log(chalk.red(err));
	}
});

// init express application
var app = require('./config/express')(db);

// init socket
// THIS IS A DEMO BRANCH. FOR EEG INJECTION, CHECK OUT ANY OTHER BRANCH.
var io = app.get('socketio');
io.on('connect', function(socket) {
  setInterval(function() { 
    socket.emit('eeg', 'start');
  }, 500);
});

// Start the app by listening on <port>
app.get('server').listen(config.port);

// Expose app
exports = module.exports = app;

// Logging initialization
console.log('MEAN.JS application started on port ' + config.port);

