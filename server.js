'use strict';

// module dependencies
var init = require('./config/init')(),
	config = require('./config/config'),
	mongoose = require('mongoose'),
	chalk = require('chalk');

var neurosky = require('node-neurosky');



// main application entry file

// Bootstrap db connection
var db = mongoose.connect(config.db, function(err) {
	if (err) {
		console.error(chalk.red('Could not connect to MongoDB!'));
		console.log(chalk.red(err));
	}
});

// Init the express application
var app = require('./config/express')(db);

// var server = require('http').createServer(app);
// var io = require('socket.io')(server);

var client = neurosky.createClient({
  appName:'NodeNeuroSky',
  appKey:'0fc4141b4b45c675cc8d3a765b8d71c5bde9390'
});

client.connect();

client.on('data',function(data){
  console.log(data);
});

// io.on('connect', function(socket) {

//   socket.emit('test', {hello: 'world'});

//   // client.on('data',function(data){
//   //   console.log(data);
//   //   socket.emit('eeg', data)
//   // });

// });

// Bootstrap passport config
require('./config/passport')();

// Start the app by listening on <port>
app.listen(config.port);

// Expose app
exports = module.exports = app;

// Logging initialization
console.log('MEAN.JS application started on port ' + config.port);

