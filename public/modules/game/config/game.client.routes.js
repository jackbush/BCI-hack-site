'use strict';
angular.module('game').config(['$stateProvider',
	function($stateProvider) {
		$stateProvider.
		state('games', {
			url: '/games',
			templateUrl: 'modules/game/views/games.client.view.html'
		});
	}
]);