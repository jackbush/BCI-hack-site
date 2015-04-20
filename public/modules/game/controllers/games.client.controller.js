'use strict';

angular.module('game').controller('GamesController', ['$scope', 'socketFactory',
	function($scope, socketFactory) {
    //index
    $scope.games = [{
      title: 'FOCUS',
      path: '/#!/games/overlap'
    },{
      title: 'MEDITATE',
      path: '/#!/games/outline'
    }];
    //score logic
    $scope.focusScore = 0;
    $scope.meditationScore = 0;
    socketFactory().on('eeg', function(data) {
      $scope.eegBlink = data.blinkStrength;
      $scope.eegAttention = data.eSense.attention;
        if($scope.eegAttention === 100) {
          $scope.focusScore = $scope.focusScore + 1;
        } else {
          $scope.focusScore = 0; 
        }
      $scope.eegMeditation = data.eSense.meditation;
        if($scope.eegMeditation === 100) {
          $scope.meditationScore = $scope.meditationScore + 1;
        } else {
          $scope.meditationScore = 0; 
        }
      $scope.eegSignal = (100 - (data.poorSignalLevel) / 2);
    });
	}
]);