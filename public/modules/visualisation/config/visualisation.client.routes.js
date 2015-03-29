'use strict';
console.log('vis connected')
angular.module('visualisation').config(['$stateProvider',
	function($stateProvider) {
		$stateProvider.
		state('visualisation', {
			url: '/visualisation',
			templateUrl: 'modules/visualisation/views/visualisation.client.view.html'
		});
	}
]);