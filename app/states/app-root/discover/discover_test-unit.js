'use strict';

/* global inject */
/* global expect */

describe('Tracker', function() {
	var scope;
	var controller; // eslint-disable-line no-unused-vars

	beforeEach(function() {
		module('appSproutClient');
	});

	beforeEach(inject(function($rootScope, $controller) {
		scope = $rootScope.$new();
		controller = $controller('TrackerController', { $scope: scope });
	}));

	it('should have a scope variable', function() {
		expect(scope.stateName).to.equal('tracker');
	});
});
