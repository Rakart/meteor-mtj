angular.module('core').controller('DashboardController', ['$scope', '$meteor', '$state',
    function($scope, $meteor, $state) {

		$scope.users = $meteor.collection(Meteor.users, false).subscribe('users');
		$scope.thisUser = $meteor.object(Meteor.users, { _id: Meteor.userId() }, false).subscribe('thisUser');

		console.log($scope.thisUser);
		
		$scope.remove = function(user) {
			$scope.users.remove(user);
		};

		$scope.navigate = function(routeName){
			$state.go(routeName);
		};
    }
]);