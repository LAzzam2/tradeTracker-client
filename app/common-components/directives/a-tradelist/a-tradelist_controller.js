'use strict';

/* global angular */

(function() {
	var aTradelist = angular.module('aTradelist');
	aTradelist.controller('ATradelistController', function( $scope, $rootScope, tradelistFactory, $timeout) {

		$scope.subState = $scope.$parent;

		$scope.tradelist = [];
		$scope.newItem = '';

		$scope.currentDate = moment().format("M/D/YY");

		var tradelistCopy;

		$scope.loading = true;

		console.log($scope.subState);

		if($scope.subState.tracker){
			var tradelistFetch = tradelistFactory.getTradelist()
		}
		if($scope.subState.discover){
			var tradelistFetch = tradelistFactory.getCommunityTradelist()
		}


		var getTradelist = function() {
			tradelistFetch
			.then(function(tradelist) {
				console.log(tradelist);
				if ((!tradelist) || (tradelist.length === 0)) {
					tradelistCopy = angular.copy($scope.tradelist);
					$scope.addNewTradelistItem();
				} else {
					$scope.tradelist = tradelist;
					$rootScope.$broadcast('tradeActionUpdated', { tradelist: $scope.tradelist });
					tradelistCopy = angular.copy($scope.tradelist);
				}

				$timeout(function() {
					$scope.loading = false;
				}, 200);
			});
		};
		getTradelist();
		tradelistCopy = angular.copy($scope.tradelist);

		$scope.addNewTradelistItem = function(itemValue) {
			if ((itemValue === '') || (itemValue === undefined)) {
				return;
			}

			var newItem = {
				name: itemValue,
				actions: [{ date: moment().format("M/D/YY"), price: '', quantity: ''}],
				tradeValue: ''
			};

			$scope.tradelist.push(newItem);
			$scope.saveTradelist(newItem, 0);
		};

		$scope.addTradeAction = function( e, item, action, index ) {
			if( action.price ){
				// Check if user wants to delete action
				if( action.quantity == '0' || action.quantity == '' ) {

						var index;
						item.actions.some(function(entry, i) {
						    if (entry.$$hashKey == action.$$hashKey) {
						        index = i;
						        return true;
						    }
						});
						item.actions.splice(index,1);
				}
				// Check if there's a date
				if( !action.date && action.price && action.quantity ){
					alert('Please specify a date for this action.')
				} else{
					// Check if action closes trade
					if( getTradeStatus( item ).direction != 'closed' ){
						// If trade not closed, insert empty action to continue trade
						var newItem = item.actions;
						if( newItem[newItem.length - 1].price && newItem[newItem.length - 1].quantity ){
							newItem.push({ price: '', quantity: ''});
						}
					}
					else {
						var data = item.actions;
						angular.forEach(data,function(value){
					    	if( !value['quantity'] || !value['price'] ){
					    		var index = item.actions.indexOf(value)
					    		item.actions.splice(index, 1);
					        }
					    });
					}
					item.tradeValue = calculateTrade( item );
					item.direction = getTradeStatus( item ).direction;
					item.count = getTradeStatus( item ).count;
					$scope.saveTradelist(item, index);
					$rootScope.$broadcast('tradeActionUpdated', { tradelist: $scope.tradelist });
				}
			}
		}

		function getTradeStatus( item ){
			var data = item.actions;
		    if (angular.isUndefined(data) && angular.isUndefined('quantity')) 
		        return 0; 
		    var sum = 0;
		    angular.forEach(data,function(value){
		    	if(value['quantity']){
			        sum = sum + Number(value['quantity']);
		        }
		    });
		    if ( sum == 0 ){
		    	return {direction:'closed', count:sum};
		    } else if ( sum < 0){
		    	return {direction:'short', count:sum};
		    } else if ( sum > 0 ){
		    	return {direction:'long', count:sum};
		    }
		}

		function calculateTrade( item ){
			var data = item.actions;
		    var sum = 0;
		    var sumOld = 0;
		    angular.forEach(data,function(value){
		    	if(value['price'] && value['quantity']){
		    		sumOld = sum;
		    		var price = (Number(value['price']) * Number(value['quantity']))*-1;
		    		var sumNew = sum + price;
		    		var tradeDirection = getTradeStatus( item ).direction;
		    		if( tradeDirection == 'closed' ){
			        	sum = sum + ((Number(value['price']) * Number(value['quantity'])*-1));
			        }
		        }
		    });
		    if( sumOld != 0 ){
		    	return sum.toFixed(2);
		    }
		}

		var saveTradelistItemAnimation = function(index) {
			var tradelistItems = document.getElementsByClassName('trade');
			var savedTradelistItem = tradelistItems[index];

			savedTradelistItem.style.backgroundColor = '#E8FFF0';
			savedTradelistItem.style.WebkitTransition = 'none';

			$timeout(function() {
				savedTradelistItem.style.WebkitTransition = 'background-color 1s ease-in';
				savedTradelistItem.style.backgroundColor = '#fcfcfa';
			}, 50);

			savedTradelistItem.addEventListener('webkitTransitionEnd', function() {
				savedTradelistItem.style.WebkitTransition = '';
				savedTradelistItem.style.backgroundColor = '';
			});
		};

		var updateTradelistCopy = function() {
			tradelistCopy = angular.copy($scope.tradelist);
		};

		$scope.saveTradelist = function(item, index) {
			// If trying to save a newly created list item with no value,
			// don't do anything.
			if ((item.name === undefined) && (item._id === undefined)) {
				return;
			}

			// Because we are using the reverse filter,
			// we need to get the actual index.
			var realIndex = $scope.tradelist.length - index - 1;

			// If the new value is the same as the factory value,
			// dont do anything.
			if ((tradelistCopy[realIndex]) && (item.name === tradelistCopy[realIndex].name)) {
				tradelistFactory.upsertTradelistItem(item)
				.then(function(response) {
					// If the user is creating a new item,
					// we need to give it an ID that we get back from the server.
					if (response.newTradelistItem) {
						$timeout(function() {
							$scope.tradelist[realIndex]._id = response.newTradelistItem._id;
							$scope.newItem = '';
						});
					}
					updateTradelistCopy();
					// saveTradelistItemAnimation(index);
				});
				return;
			}



			// If trying to save an existing list item with no value,
			// delete it.
			if ((item.name === '') && (item._id !== undefined)) {
				$scope.deleteTradelistItem(item, index);

				return;
			}


			tradelistFactory.upsertTradelistItem(item)
			.then(function(response) {
				// If the user is creating a new item,
				// we need to give it an ID that we get back from the server.
				if (response.newTradelistItem) {
					$timeout(function() {
						$scope.tradelist[realIndex]._id = response.newTradelistItem._id;
						$scope.newItem = '';
					});
				}

				updateTradelistCopy();

				// saveTradelistItemAnimation(index);
			});
		};

		$scope.deleteTradelistItem = function(item, index) {
			var inverseIndex = $scope.tradelist.length - index - 1;

			tradelistFactory.deleteTradelistItem(item)
			.then(function() {
				$scope.tradelist.splice(inverseIndex, 1);
				updateTradelistCopy();
				setTimeout(function () {
			        $scope.$apply(function () {
			            $rootScope.$broadcast('tradeActionUpdated', { tradelist: $scope.tradelist });
			        });
			    }, 700);
			});
		};

	});
})();