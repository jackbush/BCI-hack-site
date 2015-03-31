'use strict';

angular.module('visualisation').factory('P5', ['$window',
	function($window) {
		return $window.p5;
	}
]);