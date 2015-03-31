'use strict';

angular.module('visualisation').factory('Eegvisualisation', ['p5',
	function(p5) {
		return function(p) {
	    var socket = io.connect();

	    p.setup = function() {
	      var eegCanvas = p.createCanvas(window.innerWidth, window.innerHeight);
			  p.background(128);
		    socket.on('eeg', function(data) {
		      var attention = data.eSense.attention
		      var meditation = data.eSense.meditation
				  // p.background(128);
		      p.noFill();
		      p.stroke(255);
		      p.strokeWeight(1);
		      p.ellipse(0, 250, 12*attention,12*attention);
		      p.stroke(0);
		      p.ellipse(800, 250, 12*meditation,12*meditation);
		    });
	    };
	  };
	}
]);