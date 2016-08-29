'use strict';
/* global angular */

(function() {
	var appConstants = angular.module('appConstants', []);

	appConstants.constant('appConstants', {
		// Setup Config (!)

		// BACKEND_URL: 'http://localhost:9000'
		BACKEND_URL: 'http://ec2-52-37-46-206.us-west-2.compute.amazonaws.com:80'
		
	});
})();
