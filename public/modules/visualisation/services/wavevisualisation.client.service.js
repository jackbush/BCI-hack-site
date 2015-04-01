'use strict';

angular.module('visualisation').factory('waveVisualisation', ['p5',
	function(p5) {
		return function(p) {
	    var socket = io.connect();

	    p.setup = function() {
	      p.createCanvas(window.innerWidth, window.innerHeight);
			  p.background(128);
		    socket.on('eeg', function(data) {
		      var attention = data.eSense.attention;
		      var meditation = data.eSense.meditation;
				  // p.background(128);
		      p.noFill();
		      p.stroke(255);
		      p.strokeWeight(1);
		      p.ellipse(0, window.innerHeight/2, 18*attention,18*attention);
		      p.stroke(0);
		      p.ellipse(window.innerWidth, window.innerHeight/2, 18*meditation,18*meditation);
		    });
	    };
	  };
	}
]);