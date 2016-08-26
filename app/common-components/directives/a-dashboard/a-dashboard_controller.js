'use strict';

/* global angular */

(function() {
	var aDashboard = angular.module('aDashboard');
	aDashboard.controller('ADashboardController', function( $scope, $rootScope, tradelistFactory, $timeout) {


		$scope.accountValue;

		$scope.$on('tradeActionUpdated', function(event, args) {
		    var tradelist = args.tradelist;
		    calculateValue( tradelist );
		});

		var getTradelist = function() {
			tradelistFactory.getTradelist()
			.then(function(tradelist) {
				 calculateValue( tradelist );
			});
		};
		getTradelist();

		function calculateValue( tradelist ){
			var sum = 0;
			tradelist.forEach(function(entry) {
			    sum += parseInt(entry.tradeValue);
			});
			$scope.accountValue = sum;
		}
	
	});
})();
