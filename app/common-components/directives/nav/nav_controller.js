'use strict';

( function(  )
{
	var nav = angular.module( 'nav' );

	nav.controller( 'NavController', function( $rootScope, $scope, storageFactory, sessionFactory, $state, $timeout )
	{
		console.log( 'NavController active!' );

		$scope.$on( '$stateChangeSuccess', function( event, toState, toParams, fromState, fromParams ) {
			$scope.user = storageFactory.local.getObject( 'user' );
		} );


		$scope.logout = function(  ) {
			sessionFactory.logout(  )
			.then( function(  ) {
				$state.go( 'homepage', { reload: true });
				$scope.user = storageFactory.local.getObject( 'user' );
			} );
		};

	} );

} )(  );
