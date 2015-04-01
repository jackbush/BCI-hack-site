'use strict';

angular.module('core').factory('introSketch', [
	function(p5) {
		return function(p) {
	    p.colorMode(p.RGB, 255);
	    var socket = io.connect();
	    var vertC = window.innerHeight/2;
	    var horiC = window.innerWidth/2;
	    var white = p.color(255,255,255);
	    var navy = p.color(20,24,39);
	    var xpos = 0;

	    p.setup = function() {
	      p.createCanvas(window.innerWidth, window.innerHeight);
			  p.background(white);
	    };
	    
	    p.draw = function() {
	    	// console.log('hi')
			  p.background(white);
			  p.fill(navy);
			  p.stroke(0,0,0);
			  p.ellipseMode(p.CENTER);
			  xpos = xpos + 1;
			  if(xpos > p.width) {
			  	xpos = 0;
			  }
			  // draw a circle
			  p.ellipse(xpos, 100, 25, 25);
			  // display xpos variable
			  p.fill(0);
			  p.text("xpos = " + xpos, 25, 25);
	    };
	  };
	}
]);

// socket.on('eeg', function(data) {
//   var attention = data.eSense.attention;
//   var meditation = data.eSense.meditation;
//   // p.background(128);
//   p.noFill();
//   p.stroke(255);
//   p.strokeWeight(1);
//   p.ellipse(0, window.innerHeight/2, 18*attention,18*attention);
//   p.stroke(0);
//   p.ellipse(window.innerWidth, window.innerHeight/2, 18*meditation,18*meditation);
// });