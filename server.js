'use strict';

// MODULE DEPENDENCIES

var init = require('./config/init')(),
	config = require('./config/config'),
	mongoose = require('mongoose'),
	chalk = require('chalk'),
  neurosky = require('node-neurosky');

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

// EEG CONNECTION (does not prevent error when thinkgear driver is not on)
try {
  // INIT
  var client = neurosky.createClient({
    appName:'NodeNeuroSky',
    appKey:'0fc4141b4b45c675cc8d3a765b8d71c5bde9390'
  });
  // CONNECTION
  client.connect();
  var io = app.get('socketio');
  // SOCKET EMIT
  io.on('connect', function(socket) {
    client.on('data',function(data) {
      socket.emit('eeg', data);
    });
  });
} catch(e) {
  console.log(e);
}

// Bootstrap passport config
require('./config/passport')();

// Start the app by listening on <port>
app.get('server').listen(config.port);

// Expose app
exports = module.exports = app;

// Logging initialization
console.log('MEAN.JS application started on port ' + config.port);

