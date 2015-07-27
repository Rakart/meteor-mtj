'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$state', '$timeout', '$mdSidenav', '$mdUtil', '$log',
	function($scope, $state, $timeout, $mdSidenav, $mdUtil, $log) {

		$scope.userId = Meteor.userId;

		$scope.navigate = function(routeName){
			$state.go(routeName);
			// closes side bar upon navigation to new page
			$scope.close();
		};

		function buildToggler(navID) {
			var debounceFn =  $mdUtil.debounce(function(){
				$mdSidenav(navID)
					.toggle()
					.then(function () {
						$log.debug('toggle ' + navID + ' is done');
					});
			},200);
			return debounceFn;
		}

		$scope.toggleLeft = buildToggler('left');
		
		$scope.close = function() {
			$mdSidenav('left').close();
		};
	}
]);
