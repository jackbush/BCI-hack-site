'use strict';

angular.module('game').factory('overlapGame', [
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
			  var attention = (data.eSense) ? data.eSense.attention : attention;
			  p.draw = function() {
				  p.background(255,255,255,20);
				  p.fill(150,250,150,10);
				  p.noStroke();
				  p.ellipseMode(p.CENTER);
				  if(attention){
					  p.ellipse(p5width/2+(200-2*attention), p5height/2+25, 0.8*p5height, 0.8*p5height);
					  p.ellipse(p5width/2-(200-2*attention), p5height/2+25, 0.8*p5height, 0.8*p5height);
					} else {
						p.ellipse(p5width/2+100, p5height/2+25, 0.8*p5height, 0.8*p5height);
					  p.ellipse(p5width/2-100, p5height/2+25, 0.8*p5height, 0.8*p5height);
					}
		    };
			});
	  };
	}
]);