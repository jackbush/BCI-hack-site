'use strict';
angular.module('game').factory('outlineGame', [
	function(p5) {
		return function(p) {
	    p.colorMode(p.RGBA, 255);
	    var socket = io.connect();
	    var p5height = window.innerHeight;
	    var p5width = window.innerWidth;

	    p.setup = function() {
	      p.createCanvas(p5width, p5height);
			  p.background(250,250,250,255);
	    };
	    
		  socket.on('eeg', function(data) {
			  var meditation = (data.eSense) ? data.eSense.meditation : 60;
			  var d = 0.8*p5height;
			  var meditationRange = meditation/2;
			  p.draw = function() {
				  p.background(255,255,255,20);
				  p.fill(70,250,180,3);
				  p.stroke(35,125,90,30);

				  p.ellipseMode(p.CENTER);
				  p.ellipse(p5width/2, p5height/2+25, d, d);
				  p.ellipse(p5width/2, p5height/2+25, d+meditationRange*Math.random(), d-meditationRange*Math.random());
				  p.ellipse(p5width/2, p5height/2+25, d-meditationRange*Math.random(), d+meditationRange*Math.random());
		    };
			});
	  };
	}
]);