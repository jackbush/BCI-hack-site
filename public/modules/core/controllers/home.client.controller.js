'use strict';

angular.module('core').controller('HomeController', ['$scope',
	function($scope) {
    $scope.selectedIntroduction = '1';
    $scope.introductions = [{
      num: '1',
      title: 'Welcome',
      sketch: 'sketch',
      body: 'Below is a brief connection guide and two simple exercises to introduce you to the technology. Once you feel comfortable, use the navigation links above to click through to more complex games and visualisations. Using the full site requires an EEG headset.'
    },{
      num: '2',
      title: 'Connecting',
      sketch: 'sketch',
      body: 'To get started, plug in your headset and click the CONNECTION area in the top right corner. As soon as a link is established, streaming data will appear. This panel is available throughout the site.'
    },{
      num: '3',
      title: 'Focus',
      sketch: 'sketch',
      body: 'Control the size of the circle by focussing on it. See if you can get it to touch the edge of the canvas, and how long you can hold it at that size.'
    },{
      num: '4',
      title: 'Meditation',
      sketch: 'sketch',
      body: 'Calm your mind to slow the oscillation of the graph. Breathe deeply and see if you can get the visualisation to stop entirely.'
    }];
    $scope.selectIntroduction = function(introduction) {
      $scope.selectedIntroduction = introduction;
    };
  }
]);