'use strict';

angular.module('visualisation').factory('waveVisualisation', ['p5',
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

			  var eegBlink = (data) ? (data.blinkStrength) : 0;
	      var eegAttention = (data) ? (data.eSense.attention) : 0;
	      var eegMeditation = (data) ? (data.eSense.meditation) : 0;
	      var eegSignal = (100 - (data.poorSignalLevel) / 2);

	      var eegDelta = (data) ? (data.eegPower.delta) : 0;
	      var eegTheta = (data) ? (data.eegPower.theta) : 0;
	      var eegLowAlpha = (data) ? (data.eegPower.lowAlpha) : 0;
	      var eegHighAlpha = (data) ? (data.eegPower.highAlpha) : 0;
	      var eegLowBeta = (data) ? (data.eegPower.lowBeta) : 0;
	      var eegHighBeta = (data) ? (data.eegPower.highBeta) : 0;
	      var eegLowGamma = (data) ? (data.eegPower.lowGamma) : 0;
	      var eegHighGamma = (data) ? (data.eegPower.highGamma) : 0;
	      
			  p.draw = function() {
			  	// wave graph
				  p.background(255,255,255,20);
				  p.fill(70,250,180,3);
				  p.stroke(35,125,90,30);
		    };

			});
	  };
	}
]);
]);