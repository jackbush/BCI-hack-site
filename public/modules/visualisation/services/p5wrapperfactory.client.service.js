// 'use strict';

// angular.module('visualisation').factory('P5wrapperfactory', ['$injector', 'p5', 
// 	function() {
// 		var p5Wrapper = {
// 	    init: function(sketch, node) {
// 	      this.destroy();
	  
// 	      if(sketch) {
// 	        if($injector.has(sketch)) {
// 	          sketch = $injector.get(sketch);
// 	        }
// 	        this.instance = new p5(sketch, node);
// 	      }
// 	    },
	    
// 	    destroy: function() {
// 	      if(this.instance) {
// 	        this.instance.remove();
// 	        this.instance = null;
// 	      }
// 	    }
// 	  };
// 	  return function() {
// 	    return Object.create(p5Wrapper);
// 	  };
// 	}
// ]);