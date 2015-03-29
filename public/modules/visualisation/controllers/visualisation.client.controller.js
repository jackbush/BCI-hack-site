'use strict';

angular.module('visualisation').controller('VisualisationController', ['$scope',
	function($scope) {
		// processing inclusion

    var socket = io();
    socket.on('connect', function() {
      console.log('EEG SOCKET CONNECTED')
    });
    socket.on('eeg', function(data) {
      console.log(data);
      $scope.eegBlink = data['blinkStrength'];
      $scope.eegAttention = data['eSense']['attention']);
      $scope.eegMeditation = data['eSense']['meditation']);
      $scope.eegDelta = data['eegPower']['delta']);
      $scope.eegTheta = data['eegPower']['theta']);
      $scope.eegLowAlpha = data['eegPower']['lowAlpha']);
      $scope.eegHighAlpha = data['eegPower']['highAlpha']);
      $scope.eegLowBeta = data['eegPower']['lowBeta']);
      $scope.eegHighBeta = data['eegPower']['highBeta']);
      $scope.eegLowGamma = data['eegPower']['lowGamma']);
      $scope.eegHighGamma = data['eegPower']['highGamma']);
      // $scope.eegBlink = '0'
      $scope.eegSignal = 100 - (data['poorSignalLevel']) / 2;
    })
  }
]);