'use strict';

/* global inject */
/* global expect */

describe('Root', function() {
	var scope;
	var controller; // eslint-disable-line no-unused-vars

	beforeEach(function() {
		module('appSproutClient');
	});

	beforeEach(inject(function($rootScope, $controller) {
		scope = $rootScope.$new();
		controller = $controller('HomepageController', { $scope: scope });
	}));

	it('should have a scope variable', function() {
		expect(scope.stateName).to.equal('homepage');
	});
});
