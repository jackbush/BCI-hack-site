'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'bci-site';
	var applicationModuleVendorDependencies = ['ngResource', 'ngTouch',  'ui.router', 'ui.bootstrap', 'ui.utils', 'btford.socket-io', 'angular-p5'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();
'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('game');

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');
'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('visualisation');

'use strict';

angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		})
		.state('introduction', {
			url: '/introduction',
			templateUrl: 'modules/core/views/introduction.client.view.html'
		})
		.state('about', {
			url: '/about',
			templateUrl: 'modules/core/views/about.client.view.html'
		});
	}
]);
'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$window', 'socketFactory',
  function($scope, $window, socketFactory) {
    $scope.check = false;
    $scope.toggleEeg = function() {
        $scope.check = $scope.check === false ? true : false;
    };

    try {
      var socket = io.connect('http://localhost:9876');
    } catch(e) {
      var socket = io.connect();
    };
    socket.on('eeg', function(data) {
      console.log(data);
      $scope.eegBlink = (data) ? (data.blinkStrength) : '';
      $scope.eegAttention = (data) ? (data.eSense.attention) : '';
      $scope.eegMeditation = (data) ? (data.eSense.meditation) : '';
      $scope.eegDelta = (data) ? (data.eegPower.delta) : '';
      $scope.eegTheta = (data) ? (data.eegPower.theta) : '';
      $scope.eegLowAlpha = (data) ? (data.eegPower.lowAlpha) : '';
      $scope.eegHighAlpha = (data) ? (data.eegPower.highAlpha) : '';
      $scope.eegLowBeta = (data) ? (data.eegPower.lowBeta) : '';
      $scope.eegHighBeta = (data) ? (data.eegPower.highBeta) : '';
      $scope.eegLowGamma = (data) ? (data.eegPower.lowGamma) : '';
      $scope.eegHighGamma = (data) ? (data.eegPower.highGamma) : '';
      $scope.eegSignal = (100 - (data.poorSignalLevel) / 2);
    });
  }
]);
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
'use strict';

angular.module('core').factory('introSketch', [
	function(p5) {
		return function(p) {
	    p.colorMode(p.RGBA, 255);
	    var socket = io.connect();
	    var p5height = window.innerHeight;
	    var p5width = window.innerWidth;

	    p.setup = function() {
	      p.createCanvas(p5width, p5height);
			  p.background(250,250,250,255);
	    };

		  socket.on('eeg', function(data) {
			  var attention = (data.eSense) ? data.eSense.attention : attention;
			  var meditation = (data.eSense) ? data.eSense.meditation : 60;
			  var d = 0.8*p5height;
			  var meditationRange = 50-meditation/2;
			  p.draw = function() {
				  p.background(255,255,255,20);
				  p.fill(61,216,235,3);
				  p.stroke(12,35,64,30);
				  p.ellipseMode(p.CENTER);
				  if(attention){
					  p.ellipse(p5width/2+(200-2*attention), p5height/2+25, d, d);
					  p.ellipse(p5width/2+(200-2*attention), p5height/2+25, d+meditationRange*Math.random(), d-meditationRange*Math.random());
					  p.ellipse(p5width/2+(200-2*attention), p5height/2+25, d-meditationRange*Math.random(), d+meditationRange*Math.random());
					  p.ellipse(p5width/2-(200-2*attention), p5height/2+25, d, d);
					  p.ellipse(p5width/2-(200-2*attention), p5height/2+25, d+meditationRange*Math.random(), d-meditationRange*Math.random());
					  p.ellipse(p5width/2-(200-2*attention), p5height/2+25, d-meditationRange*Math.random(), d+meditationRange*Math.random());
					} else {
						var testAttR = Math.random() * 15;
					  p.ellipse(p5width/2+(200-testAttR), p5height/2+25, d, d);
					  p.ellipse(p5width/2+(200-testAttR), p5height/2+25, d+meditationRange*Math.random(), d-meditationRange*Math.random());
					  p.ellipse(p5width/2+(200-testAttR), p5height/2+25, d-meditationRange*Math.random(), d+meditationRange*Math.random());
					  p.ellipse(p5width/2-(200-testAttR), p5height/2+25, d, d);
					  p.ellipse(p5width/2-(200-testAttR), p5height/2+25, d+meditationRange*Math.random(), d-meditationRange*Math.random());
					  p.ellipse(p5width/2-(200-testAttR), p5height/2+25, d-meditationRange*Math.random(), d+meditationRange*Math.random());
					}
		    };
			});
	  };
	}
]);
'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

	function() {
		// // Define a set of default roles
		// this.defaultRoles = ['*'];

		// // Define the menus object
		// this.menus = {};

		// // A private function for rendering decision 
		// var shouldRender = function(user) {
		// 	if (user) {
		// 		if (!!~this.roles.indexOf('*')) {
		// 			return true;
		// 		} else {
		// 			for (var userRoleIndex in user.roles) {
		// 				for (var roleIndex in this.roles) {
		// 					if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
		// 						return true;
		// 					}
		// 				}
		// 			}
		// 		}
		// 	} else {
		// 		return this.isPublic;
		// 	}

		// 	return false;
		// };

		// // Validate menu existance
		// this.validateMenuExistance = function(menuId) {
		// 	if (menuId && menuId.length) {
		// 		if (this.menus[menuId]) {
		// 			return true;
		// 		} else {
		// 			throw new Error('Menu does not exists');
		// 		}
		// 	} else {
		// 		throw new Error('MenuId was not provided');
		// 	}

		// 	return false;
		// };

		// // Get the menu object by menu id
		// this.getMenu = function(menuId) {
		// 	// Validate that the menu exists
		// 	this.validateMenuExistance(menuId);

		// 	// Return the menu object
		// 	return this.menus[menuId];
		// };

		// // Add new menu object by menu id
		// this.addMenu = function(menuId, isPublic, roles) {
		// 	// Create the new menu
		// 	this.menus[menuId] = {
		// 		isPublic: isPublic || false,
		// 		roles: roles || this.defaultRoles,
		// 		items: [],
		// 		shouldRender: shouldRender
		// 	};

		// 	// Return the menu object
		// 	return this.menus[menuId];
		// };

		// // Remove existing menu object by menu id
		// this.removeMenu = function(menuId) {
		// 	// Validate that the menu exists
		// 	this.validateMenuExistance(menuId);

		// 	// Return the menu object
		// 	delete this.menus[menuId];
		// };

		// // Add menu item object
		// this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
		// 	// Validate that the menu exists
		// 	this.validateMenuExistance(menuId);

		// 	// Push new menu item
		// 	this.menus[menuId].items.push({
		// 		title: menuItemTitle,
		// 		link: menuItemURL,
		// 		menuItemType: menuItemType || 'item',
		// 		menuItemClass: menuItemType,
		// 		uiRoute: menuItemUIRoute || ('/' + menuItemURL),
		// 		isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
		// 		roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
		// 		position: position || 0,
		// 		items: [],
		// 		shouldRender: shouldRender
		// 	});

		// 	// Return the menu object
		// 	return this.menus[menuId];
		// };

		// // Add submenu item object
		// this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
		// 	// Validate that the menu exists
		// 	this.validateMenuExistance(menuId);

		// 	// Search for menu item
		// 	for (var itemIndex in this.menus[menuId].items) {
		// 		if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
		// 			// Push new submenu item
		// 			this.menus[menuId].items[itemIndex].items.push({
		// 				title: menuItemTitle,
		// 				link: menuItemURL,
		// 				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
		// 				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
		// 				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
		// 				position: position || 0,
		// 				shouldRender: shouldRender
		// 			});
		// 		}
		// 	}

		// 	// Return the menu object
		// 	return this.menus[menuId];
		// };

		// // Remove existing menu object by menu id
		// this.removeMenuItem = function(menuId, menuItemURL) {
		// 	// Validate that the menu exists
		// 	this.validateMenuExistance(menuId);

		// 	// Search for menu item to remove
		// 	for (var itemIndex in this.menus[menuId].items) {
		// 		if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
		// 			this.menus[menuId].items.splice(itemIndex, 1);
		// 		}
		// 	}

		// 	// Return the menu object
		// 	return this.menus[menuId];
		// };

		// // Remove existing menu object by menu id
		// this.removeSubMenuItem = function(menuId, submenuItemURL) {
		// 	// Validate that the menu exists
		// 	this.validateMenuExistance(menuId);

		// 	// Search for menu item to remove
		// 	for (var itemIndex in this.menus[menuId].items) {
		// 		for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
		// 			if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
		// 				this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
		// 			}
		// 		}
		// 	}

		// 	// Return the menu object
		// 	return this.menus[menuId];
		// };

		// //Adding the topbar menu
		// this.addMenu('topbar');
	}
]);
'use strict';
angular.module('game').config(['$stateProvider',
	function($stateProvider) {
		$stateProvider.
		state('games', {
			url: '/games',
			templateUrl: 'modules/game/views/games.client.view.html'
		})
    .state('overlap', {
      url: '/games/overlap',
      templateUrl: 'modules/game/views/overlap.client.view.html'
    }).state('outline', {
      url: '/games/outline',
      templateUrl: 'modules/game/views/outline.client.view.html'
    });
	}
]);
'use strict';

angular.module('game').controller('GamesController', ['$scope', 'socketFactory',
	function($scope, socketFactory) {
    //index
    $scope.games = [{
      title: 'OVERLAP',
      path: '/#!/games/overlap'
    },{
      title: 'OUTLINE',
      path: '/#!/games/outline'
    }];
    //score logic
    $scope.focusScore = 0;
    $scope.meditationScore = 0;
    socketFactory().on('eeg', function(data) {
      $scope.eegBlink = data.blinkStrength;
      $scope.eegAttention = data.eSense.attention;
        if($scope.eegAttention === 100) {
          $scope.focusScore = $scope.focusScore + 1;
        } else {
          $scope.focusScore = 0; 
        }
      $scope.eegMeditation = data.eSense.meditation;
        if($scope.eegMeditation === 100) {
          $scope.meditationScore = $scope.meditationScore + 1;
        } else {
          $scope.meditationScore = 0; 
        }
      $scope.eegSignal = (100 - (data.poorSignalLevel) / 2);
    });
	}
]);
'use strict';
angular.module('game').factory('outlineGame', [
	function(p5) {
		return function(p) {
			try {
	      var socket = io.connect('http://localhost:9876');
	    } catch(e) {
	      var socket = io.connect();
	    };
	    p.colorMode(p.RGBA, 255);
	    var p5height = window.innerHeight;
	    var p5width = window.innerWidth;

	    p.setup = function() {
	      p.createCanvas(p5width, p5height);
			  p.background(250,250,250,255);
	    };
	    
		  socket.on('eeg', function(data) {
			  var meditation = (data.eSense) ? data.eSense.meditation : 60;
			  var d = 0.8*p5height;
			  var meditationRange = 50-meditation/2;
			  p.draw = function() {
				  p.background(255,255,255,20);
				  p.fill(61,216,235,3);
				  p.stroke(12,35,64,30);

				  p.ellipseMode(p.CENTER);
				  p.ellipse(p5width/2, p5height/2+25, d, d);
				  p.ellipse(p5width/2, p5height/2+25, d+meditationRange*Math.random(), d-meditationRange*Math.random());
				  p.ellipse(p5width/2, p5height/2+25, d-meditationRange*Math.random(), d+meditationRange*Math.random());
		    };
			});
	  };
	}
]);
'use strict';

angular.module('game').factory('overlapGame', [
	function(p5) {
		return function(p) {
			try {
	      var socket = io.connect('http://localhost:9876');
	    } catch(e) {
	      var socket = io.connect();
	    };
	    p.colorMode(p.RGBA, 255);
	    var socket = io.connect();
	    var p5height = window.innerHeight;
	    var p5width = window.innerWidth;

	    p.setup = function() {
	      p.createCanvas(p5width, p5height);
			  p.background(250,250,250,255);
	    };

		  socket.on('eeg', function(data) {
			  var attention = (data.eSense) ? data.eSense.attention : 50;
			  var d = 0.8*p5height;
			  p.draw = function() {
				  p.background(255,255,255,20);
				  p.fill(61,216,235,3);
				  p.noStroke();

				  p.ellipseMode(p.CENTER);
				  p.ellipse(p5width/2+(200-2*attention), p5height/2+25, d, d);
				  p.ellipse(p5width/2-(200-2*attention), p5height/2+25, d, d);
		    };
			});
	  };
	}
]);
'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		});
	}
]);
'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [
	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
]);
'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';
angular.module('visualisation').config(['$stateProvider',
	function($stateProvider) {
		$stateProvider
    .state('visualisations', {
			url: '/visualisations',
			templateUrl: 'modules/visualisation/views/visualisation.client.view.html'
		})
    .state('circles', {
      url: '/visualisations/circles',
      templateUrl: 'modules/visualisation/views/circles.client.view.html'
    })
    .state('waves', {
      url: '/visualisations/waves',
      templateUrl: 'modules/visualisation/views/waves.client.view.html'
    });
	}
]);
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
'use strict';

angular.module('visualisation').factory('circleVisualisation', ['p5',
	function(p5) {
		return function(p) {
			try {
	      var socket = io.connect('http://localhost:9876');
	    } catch(e) {
	      var socket = io.connect();
	    };
	    p.colorMode(p.RGBA, 255);
	    var socket = io.connect();
	    var p5height = window.innerHeight;
	    var p5width = window.innerWidth;

	    p.setup = function() {
	      p.createCanvas(p5width, p5height);
			  p.background(250,250,250,255);
	    };

		  socket.on('eeg', function(data) {
			  var attention = (data.eSense) ? data.eSense.attention : attention;
			  var meditation = (data.eSense) ? data.eSense.meditation : 60;
			  var d = 0.8*p5height;
			  var meditationRange = 50 - meditation/2;
			  p.draw = function() {
				  p.background(255,255,255,20);
				  p.fill(61,216,235,3);
				  p.stroke(12,35,64,30);
				  p.ellipseMode(p.CENTER);
				  if(attention){
					  p.ellipse(p5width/2+(200-2*attention), p5height/2+25, d, d);
					  p.ellipse(p5width/2+(200-2*attention), p5height/2+25, d+meditationRange*Math.random(), d-meditationRange*Math.random());
					  p.ellipse(p5width/2+(200-2*attention), p5height/2+25, d-meditationRange*Math.random(), d+meditationRange*Math.random());
					  p.ellipse(p5width/2-(200-2*attention), p5height/2+25, d, d);
					  p.ellipse(p5width/2-(200-2*attention), p5height/2+25, d+meditationRange*Math.random(), d-meditationRange*Math.random());
					  p.ellipse(p5width/2-(200-2*attention), p5height/2+25, d-meditationRange*Math.random(), d+meditationRange*Math.random());
					} else {
						var testAttR = Math.random() * 15;
					  p.ellipse(p5width/2+(200-testAttR), p5height/2+25, d, d);
					  p.ellipse(p5width/2+(200-testAttR), p5height/2+25, d+meditationRange*Math.random(), d-meditationRange*Math.random());
					  p.ellipse(p5width/2+(200-testAttR), p5height/2+25, d-meditationRange*Math.random(), d+meditationRange*Math.random());
					  p.ellipse(p5width/2-(200-testAttR), p5height/2+25, d, d);
					  p.ellipse(p5width/2-(200-testAttR), p5height/2+25, d+meditationRange*Math.random(), d-meditationRange*Math.random());
					  p.ellipse(p5width/2-(200-testAttR), p5height/2+25, d-meditationRange*Math.random(), d+meditationRange*Math.random());
					}
		    };
			});
	  };
	}
]);
'use strict';

angular.module('visualisation').factory('Introvisualisation', [
	//delete me
]);
'use strict';

angular.module('visualisation').factory('waveVisualisation', ['p5',
	function(p5) {
		return function(p) {
			try {
	      var socket = io.connect('http://localhost:9876');
	    } catch(e) {
	      var socket = io.connect();
	    };
	    p.colorMode(p.RGB, 255);
	    var socket = io.connect();
	    var p5height = window.innerHeight;
	    var p5width = window.innerWidth;
	    var xpos = 0;
	    var ypos = 0;

	    p.setup = function() {
	      p.createCanvas(p5width, p5height);
			  p.background(240,240,240);
	    };

		  socket.on('eeg', function(data) {
			  var eegBlink = (data) ? (data.blinkStrength) : 0;
	      var eegAttention = (data) ? (data.eSense.attention) : 0;
	      var eegMeditation = (data) ? (data.eSense.meditation) : 0;
	      var eegSignal = (100 - (data.poorSignalLevel) / 2);
	      var waveCorrection = 1000;

	      var eegDelta = (data) ? ((data.eegPower.delta+1)/waveCorrection) : 0;
	      var cDelta = p.color(42,161,152);
	      var eegTheta = (data) ? ((data.eegPower.theta+1)/waveCorrection) : 0;
	      var cTheta = p.color(211,54,130);
	      var eegLowAlpha = (data) ? ((data.eegPower.lowAlpha+1)/waveCorrection) : 0;
	      var cLowAlpha = p.color(211,1,2);
	      var eegHighAlpha = (data) ? ((data.eegPower.highAlpha+1)/waveCorrection) : 0;
	      var cHighAlpha = p.color(203,75,22);
	      var eegLowBeta = (data) ? ((data.eegPower.lowBeta+1)/waveCorrection) : 0;
	      var cLowBeta = p.color(38,139,210);
	      var eegHighBeta = (data) ? ((data.eegPower.highBeta+1)/waveCorrection) : 0;
	      var cHighBeta = p.color(131,148,150);
	      var eegLowGamma = (data) ? ((data.eegPower.lowGamma+1)/waveCorrection) : 0;
	      var cLowGamma = p.color(133,153,0);
	      var eegHighGamma = (data) ? ((data.eegPower.highGamma+1)/waveCorrection) : 0;
	      var cHighGamma = p.color(88,110,117);

			  p.draw = function() {
			  	//delta
				  p.stroke(cDelta);
				  p.line(xpos, ypos, xpos, eegDelta);
				  ypos = ypos + eegDelta;
				  //theta
				  p.stroke(cTheta);
				  p.line(xpos, ypos, xpos, ypos+eegTheta);
				  ypos = ypos + eegTheta;
				  //lo-alpha
				  p.stroke(cLowAlpha);
				  p.line(xpos, ypos, xpos, ypos+eegLowAlpha);
				  ypos = ypos + eegLowAlpha;
				  //hi-alpha
				  p.stroke(cHighAlpha);
				  p.line(xpos, ypos, xpos, ypos+eegHighAlpha);
				  ypos = ypos + eegHighAlpha;
				  //lo-beta
				  p.stroke(cLowBeta);
				  p.line(xpos, ypos, xpos, ypos+eegLowBeta);
				  ypos = ypos + eegLowBeta;
				  //hi-beta
				  p.stroke(cHighBeta);
				  p.line(xpos, ypos, xpos, ypos+eegHighBeta);
				  ypos = ypos + eegHighBeta;
				  //lo-gamma
				  p.stroke(cLowGamma);
				  p.line(xpos, ypos, xpos, ypos+eegLowGamma);
				  ypos = ypos + eegLowGamma;
				  //hi-gamma
				  p.stroke(cHighGamma);
				  p.line(xpos, ypos, xpos, ypos+eegHighGamma);
				  ypos = ypos + eegHighGamma;
				  //line return
				  xpos = xpos + 1;
				  if(xpos>p5width) {
				  	xpos = 0;
				  }
				  ypos = 0;
		    };
			});
	  };
	}
]);