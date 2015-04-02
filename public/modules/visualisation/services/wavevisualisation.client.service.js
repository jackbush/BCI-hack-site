'use strict';

angular.module('visualisation').factory('waveVisualisation', ['p5',
	function(p5) {
		return function(p) {
	    p.colorMode(p.RGB, 255);
	    var socket = io.connect();
	    var p5height = window.innerHeight;
	    var p5width = window.innerWidth;
	    var xpos = 0;
	    var ypos = 0;

	    p.setup = function() {
	      p.createCanvas(p5width, p5height);
			  p.background(250,250,250);
	    };

		  socket.on('eeg', function(data) {
			  var eegBlink = (data) ? (data.blinkStrength) : 0;
	      var eegAttention = (data) ? (data.eSense.attention) : 0;
	      var eegMeditation = (data) ? (data.eSense.meditation) : 0;
	      var eegSignal = (100 - (data.poorSignalLevel) / 2);
	      var waveCorrection = 1000;

	      var eegDelta = (data) ? ((data.eegPower.delta+1)/waveCorrection) : 0;
	      var cDelta = color(42,161,152);
	      var eegTheta = (data) ? ((data.eegPower.theta+1)/waveCorrection) : 0;
	      var cTheta = color(211,54,130);
	      var eegLowAlpha = (data) ? ((data.eegPower.lowAlpha+1)/waveCorrection) : 0;
	      var cLowAlpha = color(211,1,2);
	      var eegHighAlpha = (data) ? ((data.eegPower.highAlpha+1)/waveCorrection) : 0;
	      var cHighAlpha = color(203,75,22);
	      var eegLowBeta = (data) ? ((data.eegPower.lowBeta+1)/waveCorrection) : 0;
	      var cLowBeta = color(38,139,210);
	      var eegHighBeta = (data) ? ((data.eegPower.highBeta+1)/waveCorrection) : 0;
	      var cHighBeta = color(131,148,150);
	      var eegLowGamma = (data) ? ((data.eegPower.lowGamma+1)/waveCorrection) : 0;
	      var cLowGamma = color(133,153,0);
	      var eegHighGamma = (data) ? ((data.eegPower.highGamma+1)/waveCorrection) : 0;
	      var cHighGamma = color(88,110,117);

			  p.draw = function() {
			  	//delta
				  p.stroke(cDelta);
				  p.line(xpos, ypos, xpos, eegDelta);
				  ypos = ypos + eegDelta;
				  //theta
				  p.stroke(cTheta);
				  p.line(xpos, ypos, xpos, ypos+eegTheta);
				  ypos = ypos + eegTheta;
				  //lo-alpha
				  p.stroke(cLowAlpha);
				  p.line(xpos, ypos, xpos, ypos+eegLowAlpha);
				  ypos = ypos + eegLowAlpha;
				  //hi-alpha
				  p.stroke(cHighAlpha);
				  p.line(xpos, ypos, xpos, ypos+eegHighAlpha);
				  ypos = ypos + eegHighAlpha;
				  //lo-beta
				  p.stroke(cLowBeta);
				  p.line(xpos, ypos, xpos, ypos+eegLowBeta);
				  ypos = ypos + eegLowBeta;
				  //hi-beta
				  p.stroke(cHighBeta);
				  p.line(xpos, ypos, xpos, ypos+eegHighBeta);
				  ypos = ypos + eegHighBeta;
				  //lo-gamma
				  p.stroke(cLowGamma);
				  p.line(xpos, ypos, xpos, ypos+eegLowGamma);
				  ypos = ypos + eegLowGamma;
				  //hi-gamma
				  p.stroke(cHighGamma);
				  p.line(xpos, ypos, xpos, ypos+eegHighGamma);
				  ypos = ypos + eegHighGamma;
				  //line return
				  xpos = xpos + 1;
				  if(xpos>p5width) {
				  	xpos = 0;
				  }
				  ypos = 0;
		    };
			});
	  };
	}
]);
]);