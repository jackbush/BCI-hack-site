'use strict';

angular.module('visualisation').controller('VisualisationController', ['$scope', 'socketFactory',
	function($scope, socketFactory) {
    // index
    $scope.visualisations = [{
      title: 'CIRCLES',
      path: '/#!/visualisations/circles'
    },{
      title: 'WAVES',
      path: '/#!/visualisations/waves'
    }];
  }
]);