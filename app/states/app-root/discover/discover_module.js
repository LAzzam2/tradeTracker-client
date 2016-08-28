'use strict';

/* global angular */

(function() {
	var discover = angular.module('discover', [
		'ui.router',
		'ngEnter',
		'ngAnimate',
		'spinner',
		'tradelistFactory',
		'aTradelist',
	]);


	discover.config(function($stateProvider) {
		$stateProvider.state('app-root.discover', {
			url: '/discover',
			views: {
				'app-content': {
					templateUrl: 'states/app-root/discover/discover_template.html',
					controller: 'DiscoverController as Discover'
				}
			}
		});
	});
})();
