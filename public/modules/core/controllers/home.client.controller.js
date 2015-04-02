'use strict';

angular.module('core').controller('HomeController', ['$scope', 'socketFactory',
  function($scope, socketFactory) {
    $scope.selectedIntroduction = '1';
    $scope.introductions = [{
      num: '1',
      title: 'Welcome',
      body: 'Below is a brief connection guide and two simple exercises to introduce you to the technology. Once you feel comfortable, use the navigation links above to click through to more complex games and visualisations. Using the full site requires an EEG headset.'
    },{
      num: '2',
      title: 'Connecting',
      body: 'To get started, plug in your headset and click the CONNECTION area in the top right corner. As soon as a link is established, streaming data will appear. This panel is available throughout the site.'
    },{
      num: '3',
      title: 'Focus',
      body: 'Bring the circles together by focussing on them. See if you can get them to overlap perfectly, and how long you can hold it for.'
    },{
      num: '4',
      title: 'Meditation',
      body: 'Calm your mind to slow the oscillation of the outlines. Breathe deeply and see if you can get them to stop entirely.'
    }];
    $scope.selectIntroduction = function(introduction) {
      $scope.selectedIntroduction = introduction;
    };
  }
]);