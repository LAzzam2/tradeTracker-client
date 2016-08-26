'use strict';

/* global angular */

(function() {
	var tradelistFactory = angular.module('tradelistFactory', []);

	tradelistFactory.factory('tradelistFactory', function($http, $q, $state, appConstants) {
		var tradelistFactoryApi = {};

		tradelistFactoryApi.list = [];

		tradelistFactoryApi.getTradelist = function() {
			var deferred = $q.defer();
			var promise = deferred.promise;

			$http({

				method: 'get',
				withCredentials: true,
				url: appConstants.BACKEND_URL + '/api/user/tradelist'

			})
			.success(function(data) {

				tradelistFactoryApi.list = data.tradelistItems;

				deferred.resolve(data.tradelistItems);
			})
			.error(function(error) {
				console.log('Get tradelist error: ', error);
				deferred.reject(error);
			});

			return promise;
		};

		tradelistFactoryApi.upsertTradelistItem = function(item) {
			var deferred = $q.defer();
			var promise = deferred.promise;

			var cleanItem = angular.toJson(item);
			cleanItem = angular.fromJson(cleanItem);

			$http({

				method: 'post',
				withCredentials: true,
				url: appConstants.BACKEND_URL + '/api/user/tradelist',
				data: {
					tradelistItem: cleanItem
				}

			})
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(error) {
				deferred.reject(error);
			});

			return promise;
		};

		tradelistFactoryApi.deleteTradelistItem = function(item) {
			var deferred = $q.defer();
			var promise = deferred.promise;

			item = angular.toJson(item);
			item = angular.fromJson(item);

			$http({

				method: 'put',
				withCredentials: true,
				url: appConstants.BACKEND_URL + '/api/user/tradelist',
				data: {
					tradelistItem: item
				}

			})
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(error) {
				console.log('deleteTradelistItem error: ', error);
				deferred.reject(error);
			});

			return promise;
		};

		// Return public API.
		return tradelistFactoryApi;
	});
})();
