'use strict';

angular.module('visualisation').directive('p5', ['p5WrapperFactory', 
	function(p5WrapperFactory) {
		return {
	    restrict: 'EA',
	    scope: {
	      sketch: '@'
	    },
	    link: function(scope, element) {
	      var wrapper = p5WrapperFactory();
	      
	      scope.$watch('sketch', function(sketch) {
	        wrapper.init(sketch, element[0]);
	      });
	  
	      scope.$on('$destroy', function() {
	        wrapper.destroy();
	      });
	    }
	  };
	}
]);