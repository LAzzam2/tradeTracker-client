'use strict';

/* global angular */

(function() {
	var aDashboard = angular.module('aDashboard', []);

	aDashboard.directive('aDashboard', function() {
		return {
			restrict: 'E',
			scope: {
				dashboard: '='
			},
			controller: 'ADashboardController',
			templateUrl: 'common-components/directives/a-dashboard/a-dashboard_template.html'
		};
	});
})();
