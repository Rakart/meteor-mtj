angular.module('core')
    .factory('Favourites', ['$meteor',
	
    function($meteor) {
                
        var favouritesList = {};
            favouritesList.userIds = [];

        return {

            getFavourites: function(user) {
                
                for (var prop in user.favourites) {
                    favouritesList.userIds[prop] = user.favourites[prop];
                }

                favouritesList.users = $meteor.collection(function(){
                    return Meteor.users.find({ _id: {$in: favouritesList.userIds }});
                }, false);

                return favouritesList;
            },

            removeFavourite: function(user, oldFavourite) {
                delete user.favourites[oldFavourite];

                return user;
            }

        }
    }
]);

