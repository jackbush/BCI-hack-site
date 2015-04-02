'use strict';

angular.module('game').controller('GamesController', ['$scope', 'socketFactory',
	function($scope, socketFactory) {
    $scope.focusScore = 0;
    $scope.meditationScore = 0;
    socketFactory().on('eeg', function(data) {
      // console.log(data);
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
      $scope.eegDelta = data.eegPower.delta;
      $scope.eegTheta = data.eegPower.theta;
      $scope.eegLowAlpha = data.eegPower.lowAlpha;
      $scope.eegHighAlpha = data.eegPower.highAlpha;
      $scope.eegLowBeta = data.eegPower.lowBeta;
      $scope.eegHighBeta = data.eegPower.highBeta;
      $scope.eegLowGamma = data.eegPower.lowGamma;
      $scope.eegHighGamma = data.eegPower.highGamma;
      $scope.eegSignal = (100 - (data.poorSignalLevel) / 2);
    });
	}
]);