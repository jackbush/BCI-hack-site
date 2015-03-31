'use strict';
angular.module('visualisation').config(['$stateProvider',
	function($stateProvider) {
		$stateProvider
    .state('visualisation', {
			url: '/visualisation',
			templateUrl: 'modules/visualisation/views/visualisation.client.view.html'
		})
    .state('waves', {
      url: '/visualisation/waves',
      templateUrl: 'modules/visualisation/views/waves.client.view.html'
    });
	}
]);