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
			  var eegBlink = (data) ? (data.blinkStrength) : '';
	      var eegAttention = (data) ? (data.eSense.attention) : '';
	      var eegMeditation = (data) ? (data.eSense.meditation) : '';
	      var eegDelta = (data) ? (data.eegPower.delta) : '';
	      var eegTheta = (data) ? (data.eegPower.theta) : '';
	      var eegLowAlpha = (data) ? (data.eegPower.lowAlpha) : '';
	      var eegHighAlpha = (data) ? (data.eegPower.highAlpha) : '';
	      var eegLowBeta = (data) ? (data.eegPower.lowBeta) : '';
	      var eegHighBeta = (data) ? (data.eegPower.highBeta) : '';
	      var eegLowGamma = (data) ? (data.eegPower.lowGamma) : '';
	      var eegHighGamma = (data) ? (data.eegPower.highGamma) : '';
	      var eegSignal = (100 - (data.poorSignalLevel) / 2);
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