angular.module('core').controller('FavouritesController', ['$scope', '$meteor', '$state',
	function($scope, $meteor, $state) {

        $scope.favIds = [];
        $scope.User = $scope.$meteorObject(Meteor.users, { _id: Meteor.userId() }, false).subscribe('thisUser');

        for (var prop in $scope.User.favourites) {
            $scope.favIds[prop] = $scope.User.favourites[prop];
        }

        $scope.$meteorSubscribe('favourites', $scope.favIds).
            then(function(subHandle){
                $scope.favourites = $scope.$meteorCollection(function(){
                    return Meteor.users.find({ _id: {$in: $scope.favIds }});
                }, false);
                console.log('Got Favourites! ', $scope.favourites);
        });
    }
]);
