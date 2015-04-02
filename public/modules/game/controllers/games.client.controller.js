'use strict';

angular.module('game').controller('GamesController', ['$scope', 'socketFactory',
	function($scope, socketFactory) {
    // FOR TESTING CONNECTION
    // var socket = io.connect();
    // socket.on('connect', function() {
    //   console.log('EEG SOCKET CONNECTED');
    // });
    $scope.focusScore = 0;
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