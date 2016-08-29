'use strict';

( function(  )
{
	var nav = angular.module( 'nav', [ ] );

	nav.directive( 'nav', function(  )
	{
		return {

			restrict: 'E',
			scope:
			{
				nav: '='
			},
			controller: 'NavController',
			templateUrl: 'common-components/directives/nav/nav_template.html'

		};
	} );

} )(  );
