'use strict';

angular.module('core').factory('introSketch', [
	function(p5) {
		return function(p) {
	    p.colorMode(p.RGBA, 255);
	    var socket = io.connect();
	    var p5height = window.innerHeight;
	    var p5width = window.innerWidth;
	    var white = p.color(255,255,255,255);
	    var navy = p.color(20,24,39,255);
	    var xpos = 0;

	    p.setup = function() {
	      p.createCanvas(window.innerWidth, window.innerHeight);
			  p.background(white);
	    };

	    p.draw = function() {
			  socket.on('eeg', function(data) {
				  var attention = (data.eSense) ? data.eSense.attention : attention;
				  var meditation = (data.eSense) ? data.eSense.meditation : meditation;
					// console.log(attention);
				  p.background(255,255,255,30);
				  p.fill(150,250,150,50);
				  p.noStroke();
				  p.ellipseMode(p.CENTER);
				  xpos = xpos + 1;
				  if(xpos > p.width) {
				  	xpos = 0;
				  }
				  // draw circles
				  p.ellipse(p5width/2+3*attention, p5height/2+25, 0.8*p5height, 0.8*p5height);
				  p.ellipse(p5width/2-3*attention, p5height/2+25, 0.8*p5height, 0.8*p5height);
			  });
	    };
	  };
	}
]);