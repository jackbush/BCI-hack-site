'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'bci-site';
	var applicationModuleVendorDependencies = ['ngResource', 'ngTouch',  'ui.router', 'ui.bootstrap', 'ui.utils'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	// var neurosky = require('../node_modules/node-neurosky')

	// var client = neurosky.createClient({
	//   appName:'NodeNeuroSky',
	//   appKey:'0fc4141b4b45c675cc8d3a765b8d71c5bde9390'
	// })

	// client.on('data',function(data){
	//   console.log(data)
	// });

	// client.connect()

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();