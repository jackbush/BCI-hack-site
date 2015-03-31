'use strict';

angular.module('visualisation').factory('Eegvisualisation', ['p5',
	function(p5) {
		return function(p) {
	    var x = 0;
	    var socket = io.connect();

	    p.setup = function() {
	      var eegCanvas = p.createCanvas(600, 500);
			  p.background(238);
		    socket.on('connect', function() {
		      console.log('VIS SOCKET CONNECTED');
		    });
	    };

	    p.draw = function() {
	      p.ellipse(x, p.height/2, x/3, x/3);
			  x = x + 1;
	    };
	  };
	}
]);