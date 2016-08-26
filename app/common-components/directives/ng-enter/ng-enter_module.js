'use strict';

/* global angular */

(function() {
	var ngEnter = angular.module('ngEnter', []);

	ngEnter.directive('ngEnter', function() {
		return function(scope, element, attrs) {
			element.bind('keydown keypress', function(event) {
				if (event.which === 13) {
					scope.$apply(function() {
						scope.$eval(attrs.ngEnter);
					});

					event.preventDefault();
				}
			});
		};
	});
})();
