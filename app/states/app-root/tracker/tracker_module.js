'use strict';

/* global angular */

(function() {
	var tracker = angular.module('tracker', [
		'ui.router',
		'ngEnter',
		'ngAnimate',
		'spinner',
		'tradelistFactory',
		'aTradelist',
		'aDashboard',
	]);


	tracker.config(function($stateProvider) {
		$stateProvider.state('app-root.tracker', {
			url: '/tracker',
			views: {
				'app-content': {
					templateUrl: 'states/app-root/tracker/tracker_template.html',
					controller: 'TrackerController as tracker'
				}
			}
		});
	});
})();
