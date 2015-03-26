'use strict';

// var neurosky = require('../node_modules/node-neurosky')

// var client = neurosky.createClient({
//   appName:'NodeNeuroSky',
//   appKey:'0fc4141b4b45c675cc8d3a765b8d71c5bde9390'
// })

// client.on('data',function(data){
//   console.log(data)
// });

// client.connect()

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