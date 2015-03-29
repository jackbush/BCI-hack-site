'use strict';
angular.module('visualisation').config(['$stateProvider',
	function($stateProvider) {
		$stateProvider.
		state('visualisation', {
			url: '/visualisation',
			templateUrl: 'modules/visualisation/views/visualisation.client.view.html'
		});
	}
]);