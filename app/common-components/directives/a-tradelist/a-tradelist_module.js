'use strict';

/* global angular */

(function() {
	var aTradelist = angular.module('aTradelist', []);

	aTradelist.directive('aTradelist', function() {
		return {
			restrict: 'E',
			scope: {
				tradelist: '='
			},
			controller: 'ATradelistController',
			templateUrl: 'common-components/directives/a-tradelist/a-tradelist_template.html'
		};
	});
})();
