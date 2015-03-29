'use strict';

angular.module('visualisation').controller('VisualisationController', ['$scope',
	function($scope) {
		// processing inclusion

    // scope

    var socket = io();
    socket.on('connect', function() {
      console.log('EEG SOCKET CONNECTED')
    });
    socket.on('eeg', function(data) {
      console.log(data);
      // $('.eeg-blink').text(data['blinkStrength']);
      // $('.eeg-attention').text(data['eSense']['attention']);
      // $('.eeg-meditation').text(data['eSense']['meditation']);
      // $('.eeg-delta').text(data['eegPower']['delta']);
      // $('.eeg-theta').text(data['eegPower']['theta']);
      // $('.eeg-low-alpha').text(data['eegPower']['lowAlpha']);
      // $('.eeg-high-alpha').text(data['eegPower']['highAlpha']);
      // $('.eeg-low-beta').text(data['eegPower']['lowBeta']);
      // $('.eeg-high-beta').text(data['eegPower']['highBeta']);
      // $('.eeg-low-gamma').text(data['eegPower']['lowGamma']);
      // $('.eeg-high-gamma').text(data['eegPower']['highGamma']);
      // $('.eeg-blink').text('0');
      // var signal_strength = 100 - (data['poorSignalLevel']) / 2
      // $('.eeg-signal').text(signal_strength);
    })
  }
]);