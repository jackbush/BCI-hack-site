'use strict';

angular.module('core').factory('homeSketch', [
	function(p5) {
		return function(p) {
      var socket = io.connect();
	    p.colorMode(p.RGBA, 255);
	    var p5height = window.innerHeight;
	    var p5width = window.innerWidth;

	    p.setup = function() {
	      p.createCanvas(p5width, p5height);
			  p.background(250,250,250,255);
	    };

		  socket.on('eeg', function(data) {
			  var meditation = 60;
			  var d = 0.8*p5height;
			  var meditationRange = 50-meditation/2;
			  p.draw = function() {
				  p.background(255,255,255,10);
				  p.fill(64, 206, 255,3);
				  p.stroke(12,35,64,30);
				  p.ellipseMode(p.CENTER);
					var testAttR = Math.random() * 15;
				  p.ellipse(p5width/2+(200-testAttR), p5height/2+25, d, d);
				  p.ellipse(p5width/2+(200-testAttR), p5height/2+25, d+meditationRange*Math.random(), d-meditationRange*Math.random());
				  p.ellipse(p5width/2+(200-testAttR), p5height/2+25, d-meditationRange*Math.random(), d+meditationRange*Math.random());
				  p.ellipse(p5width/2-(200-testAttR), p5height/2+25, d, d);
				  p.ellipse(p5width/2-(200-testAttR), p5height/2+25, d+meditationRange*Math.random(), d-meditationRange*Math.random());
				  p.ellipse(p5width/2-(200-testAttR), p5height/2+25, d-meditationRange*Math.random(), d+meditationRange*Math.random());
		    };
			});
	  };
	}
]);