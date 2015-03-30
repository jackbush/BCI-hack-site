'use strict';

angular.module('visualisation').controller('VisualisationController', ['$scope', 'socketFactory',
	function($scope, socketFactory) {

    // $scope.test = 'jack'

    var socket = io.connect();

    // FOR TESTING CONNECTION
    socket.on('connect', function() {
      console.log('EEG SOCKET CONNECTED');
    });

    // console.log(socketFactory)

    socketFactory().on('eeg', function(data) {
      // if (data.keys) {};
      console.log(data);
      $scope.eegBlink = data.blinkStrength;
      $scope.eegAttention = data.eSense.attention;
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

    $scope.$on('socket:connect', function (ev, data) {
      console.log('hi')
      console.log(ev)
      console.log(data)
    })

    // FOR QUERYING SOCKET
    socket.on('eeg', function(data) {
      // $scope.test = 'hello world';
      // console.log(data);
      // $scope.eegSignal = data.poorSignalLevel;
      // $scope.eegBlink = data.blinkStrength;
      // $scope.eegAttention = data.eSense.attention;
      // $scope.eegMeditation = data.eSense.meditation;
      // $scope.eegDelta = data.eegPower.delta;
      // $scope.eegTheta = data.eegPower.theta;
      // $scope.eegLowAlpha = data.eegPower.lowAlpha;
      // $scope.eegHighAlpha = data.eegPower.highAlpha;
      // $scope.eegLowBeta = data.eegPower.lowBeta;
      // $scope.eegHighBeta = data.eegPower.highBeta;
      // $scope.eegLowGamma = data.eegPower.lowGamma;
      // $scope.eegHighGamma = data.eegPower.highGamma;
      // $scope.eegBlink = '0'
      // $scope.eegSignal = 100 - (data.poorSignalLevel) / 2;
    });
  }
]);
