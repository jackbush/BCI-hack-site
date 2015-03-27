'use strict';

// module dependencies
var init = require('./config/init')(),
	config = require('./config/config'),
	mongoose = require('mongoose'),
	chalk = require('chalk'),
  neurosky = require('node-neurosky');

// MAIN APPLICATION ENTRY FILE

// Bootstrap db connection
var db = mongoose.connect(config.db, function(err) {
	if (err) {
		console.error(chalk.red('Could not connect to MongoDB!'));
		console.log(chalk.red(err));
	}
});

// Init the express application
var app = require('./config/express')(db);

var client = neurosky.createClient({
  appName:'NodeNeuroSky',
  appKey:'0fc4141b4b45c675cc8d3a765b8d71c5bde9390'
});

try {
  client.connect();
} catch(e) {
  console.log(e);
}

var io = app.get('socketio');

io.on('connect', function(socket) {
  client.on('data',function(data) {
    socket.emit('eeg', data);
  });
});

// INITIATING SOCKET

//JEM
// var server = require('http').createServer(app);
// var io = require('socket.io')(server);
// io.on('connect', function(socket) {
//   socket.emit('test', {hello: 'world'});
//   // client.on('data',function(data){
//   //   console.log(data);
//   //   socket.emit('eeg', data)
//   // });
// });

//TUT
// var socketio = req.app.get('socketio'); // tacke out socket instance from the app container
// socketio.sockets.emit('article.created', article); // emit an event for all connected clients

// Bootstrap passport config
require('./config/passport')();

// Start the app by listening on <port>
app.get('server').listen(config.port);

// Expose app
exports = module.exports = app;

// Logging initialization
console.log('MEAN.JS application started on port ' + config.port);

