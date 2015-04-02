'use strict';

angular.module('game').controller('GamesController', ['$scope', 'socketFactory',
	function($scope, socketFactory) {
    //index
    $scope.games = [{
      title: 'OVERLAP',
      path: '/#!/games/overlap'
    }];
    //score logic
    $scope.focusScore = 0;
    $scope.meditationScore = 0;
    socketFactory().on('eeg', function(data) {
      $scope.eegBlink = data.blinkStrength;
      $scope.eegAttention = data.eSense.attention;
        if(eegAttention === 100) {
          $scope.focusScore = focusScore + 1;
        } else {
          $scope.focusScore = 0; 
        };
      $scope.eegMeditation = data.eSense.meditation;
        if(eegMeditation === 100) {
          $scope.meditationScore = meditationScore + 1;
        } else {
          $scope.meditationScore = 0; 
        };
      $scope.eegSignal = (100 - (data.poorSignalLevel) / 2);
    });
	}
]);