'use strict';

angular.module('visualisation').factory('Eegvisualisation', ['p5',
	function(p5) {
		return function(p) {
	    var x = 0;

	    p.setup = function() {
	      var eegCanvas = p.createCanvas(600, 400);
			  p.background(200);
			  eegCanvas.parent('eeg-canvas');
	    };

	    p.draw = function() {
	      p.ellipse(x, p.height/2, 20, 20);
			  x = x + 1;
	    };
	  };
	}
]);