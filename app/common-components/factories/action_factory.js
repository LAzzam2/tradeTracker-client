'use strict';

/* global angular */

(function() {
	var actionFactory = angular.module('actionFactory', []);

	actionFactory.factory('actionFactory', function($http, $q, $state, appConstants) {
		var actionFactoryApi = {};

		actionFactoryApi.list = [];

		// Return public API.
		return actionFactoryApi;
	});
})();
