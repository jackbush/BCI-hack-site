'use strict';

angular.module('core').controller('HomeController', ['$scope', 'socketFactory',
  function($scope, socketFactory) {
    $scope.selectedIntroduction = '1';
    $scope.introductions = [{
      num: '1',
      title: 'Welcome',
      body: 'Below is a brief connection guide and two simple exercises to introduce you to the technology. Once you feel comfortable, use the navigation links above to click through to more complex games and visualisations.',
      link: '/#!/about',
      link_text: 'Learn more'
    },{
      num: '2',
      title: 'Installation',
      body: 'Using this site requires an EEG headset. All Neurosky products are currently supported, when using the plugin available ',
      link: 'https://github.com/jackbush/neurosky-data-server',
      link_text: 'here'
    },{
      num: '3',
      title: 'Connecting',
      body: 'To get started, plug in your headset and click the CONNECTION area in the top right corner. As soon as a link is established, streaming data will appear. This panel is available throughout the site'
    },{
      num: '4',
      title: 'Focus',
      body: 'Bring the circles together by focussing on them. See if you can get them to overlap perfectly, and how long you can hold it for'
    },{
      num: '5',
      title: 'Meditation',
      body: 'Calm your mind to slow the oscillation of the outlines. Breathe deeply and see if you can get them to stop entirely'
    }];
    $scope.selectIntroduction = function(introduction) {
      $scope.selectedIntroduction = introduction;
    };
  }
]);