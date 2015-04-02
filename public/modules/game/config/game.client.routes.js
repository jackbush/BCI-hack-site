'use strict';
angular.module('game').config(['$stateProvider',
	function($stateProvider) {
		$stateProvider.
		state('games', {
			url: '/games',
			templateUrl: 'modules/game/views/games.client.view.html'
		})
    .state('overlap', {
      url: '/games/overlap',
      templateUrl: 'modules/game/views/overlap.client.view.html'
    }).state('outline', {
      url: '/games/outline',
      templateUrl: 'modules/game/views/outline.client.view.html'
    });
	}
]);