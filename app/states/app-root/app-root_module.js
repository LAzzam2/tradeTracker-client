'use strict';

/* global angular */

(function() {
	var appRoot = angular.module('appRoot', [
		'ui.router',

		'list',
		'tracker',
		'discover',
		'account'
	]);


	appRoot.config(function($stateProvider) {
		$stateProvider.state('app-root', {
			url: '/app',
			views: {
				app: {
					templateUrl: 'states/app-root/app-root_template.html',
					controller: 'AppRootController as appRoot'
				}
			},
			abstract: true
		});
	});
})();
