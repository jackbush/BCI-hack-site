'use strict';
angular.module('visualisation').config(['$stateProvider',
	function($stateProvider) {
		$stateProvider
    .state('visualisation', {
			url: '/visualisation',
			templateUrl: 'modules/visualisation/views/visualisation.client.view.html'
		})
    .state('circles', {
      url: '/visualisations/circles',
      templateUrl: 'modules/visualisation/views/circles.client.view.html'
    })
    .state('waves', {
      url: '/visualisations/waves',
      templateUrl: 'modules/visualisation/views/waves.client.view.html'
    });
	}
]);