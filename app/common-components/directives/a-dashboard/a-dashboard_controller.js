'use strict';

/* global angular */

(function() {
	var aDashboard = angular.module('aDashboard');
	aDashboard.controller('ADashboardController', function( $scope, $rootScope, tradelistFactory, $timeout) {

		$scope.accountValue;
		$scope.avgWin;
		$scope.avgLoss;
		$scope.avgTradeSize;

		$scope.$on('tradeActionUpdated', function(event, args) {
		    var tradelist = args.tradelist;
			 calculateValue( tradelist );
			 calculateAvgWin( tradelist );
			 calculateAvgLoss( tradelist );
			 calculateAvgTradeSize( tradelist );
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
				if( entry.tradeValue ){
			    	sum += parseInt(entry.tradeValue);
			    }
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

		function calculateAvgTradeSize( tradelist ){
			var actionCount = 0;
			var sum = 0;
			tradelist.forEach(function(entry) {
				var actions = entry.actions;
				actions.forEach(function(action) {
					if( action.price && action.quantity ){
						++actionCount;
						sum = sum + (Math.abs(action.price * action.quantity));
					}
				});
			});
			if( actionCount == 0 ){
				actionCount = 1;
			}
			$scope.avgTradeSize = (sum / actionCount).toFixed(2);
		};
	
	});
})();
