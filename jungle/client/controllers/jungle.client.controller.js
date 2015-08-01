angular.module('jungle').controller('JungleController', ['$scope', '$meteor',
	function($scope, $meteor) {


        $scope.images = $meteor.collectionFS(Images, false, Images).subscribe('images');
        $scope.user = $meteor.object(Meteor.users, { _id: Meteor.userId() }, false).subscribe('thisUser');


        // binds tutors from mongo to the scope for browsing with limited access to 'tutor' information.
        $scope.tutors = $meteor.collection(function(){
            return Meteor.users.find({identity: 'tutor'},

                { fields: {
                    first_name: 1,
                    last_name: 1,
                    qualifications: 1,
                    experience: 1,
                    commitmentPeriod: 1
                    }
                }
            );

            }, false).subscribe('tutors');

        // validates the tutor has filled in the required fields to be displayed inside the tutor Jungle
        $scope.tutorValidate = function(user) {
            if (user.first_name != '' &&
                user.qualifications != {} &&
                user.experience != {} &&
                user.commitmentPeriod != '') {
                return true;
            
            } else {
                
                return false;
            }
        }

        // Navigates through the tutors available.
        $scope.selected = 0;

        // scrolls to the next user inside tutor-jungle.
        $scope.nextUser = function(selected) {

            if (selected === this.tutors.length - 1 ) {
                $scope.selected = 0;
            } else {
                $scope.selected = selected + 1;
            }
        };

        // scrolls to previous user inside tutor-jungle.
        $scope.previousUser = function(selected) {

            if (selected === 0) {
                $scope.selected = this.tutors.length - 1;
            } else {
                $scope.selected = selected - 1;
            }
        };

        // js function to check if obj is inside array 'a'
        function contains(a, obj) {
            for (var i = 0; i < a.length; i++) {
                if (a[i] === obj) {
                    return true;
                }
            }
            return false;
        }

        // add user to list of favourites for logged in user.
        $scope.addFavourite = function(userId) {

            if ( contains($scope.user.favourites, userId) ) {
                
            } else {
                $scope.user.favourites.push(userId);
            }
            
            // update user collection with selected 'favourite' tutor
            Meteor.users.update({ _id: $scope.user._id}, {
                $set: {
                    "favourites" : $scope.user.favourites
                }
            });

            // TODO:
            // Favourites.update({ _id: $scope.user._id }, {
            //     $set: {
            //         'owner'     : $scope.user,
            //         'favourites': $scope.user.favourites
            //     }
            // });

            console.log('favourites', $scope.user.favourites);
        };

        // clears all favourites from the logged in users favourite list.
        $scope.resetAllFav = function () {
            $scope.user.favourites = [];

            Meteor.users.update({ _id: $scope.user._id}, {
                $set: {
                    "favourites" : []
                }
            });
            console.log('favourites', $scope.user.favourites);

        };
	}
]);
