angular.module('core').controller('HomeController', ['$scope', '$meteor',
    function($scope, $meteor) {

		$scope.users = $meteor.collection(Meteor.users, false).subscribe('users');
		
		$scope.thisUser = $meteor.object(Meteor.users, { _id: Meteor.userId() }, false).subscribe('thisUser');

		console.log($scope.thisUser);
		
		$scope.remove = function(user) {
			$scope.users.remove(user.userId);
		}
    }
]);