'use strict';

/* global angular */

(function() {
	var aDashboard = angular.module('aDashboard');
	aDashboard.controller('ADashboardController', function( $scope, $rootScope, tradelistFactory, $timeout) {


		$scope.accountValue;
		$scope.avgWin;
		$scope.avgLoss;

		$scope.$on('tradeActionUpdated', function(event, args) {
		    var tradelist = args.tradelist;
			 calculateValue( tradelist );
			 calculateAvgWin( tradelist );
			 calculateAvgLoss( tradelist );
		});

		var getTradelist = function() {
			tradelistFactory.getTradelist()
			.then(function(tradelist) {
			});
		};
		getTradelist();

		function calculateValue( tradelist ){
			var sum = 0;
			tradelist.forEach(function(entry) {
			    sum += parseInt(entry.tradeValue);
			});
			$scope.accountValue = sum;
		};

		function calculateAvgWin( tradelist ){
			var sum = 0;
			tradelist.forEach(function(entry) {
				if( entry.tradeValue > 0 ){
			    	sum += parseInt(entry.tradeValue);
			    }
			});
			$scope.avgWin = sum;
		};

		function calculateAvgLoss( tradelist ){
			var sum = 0;
			tradelist.forEach(function(entry) {
				if( entry.tradeValue < 0 ){
			    	sum += parseInt(entry.tradeValue);
			    }
			});
			$scope.avgLoss = sum;
		};
	
	});
})();
