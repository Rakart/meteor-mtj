angular.module('core')
    .controller('FavouritesController', ['$scope', '$meteor', '$state', 'Favourites',
	
    function($scope, $meteor, $state, Favourites) {
        
        $scope.User = $scope.$meteorObject(Meteor.users, { _id: Meteor.userId() }, false).subscribe('thisUser');

        $scope.$meteorSubscribe('favourites', Favourites.getFavourites($scope.User).userIds).
            then(function(subHandle){
                $scope.favourites = Favourites.getFavourites($scope.User).users;
                console.log('Got Favourites! ', $scope.favourites);
        });

        $scope.removeFav = function(fav) {
        
            Favourites.removeFavourite($scope.User, fav._id);
            
            console.log($scope.favourites);
        };

    }
]);


