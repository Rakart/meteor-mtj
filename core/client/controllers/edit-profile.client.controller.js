angular.module('core').controller('ProfileController', ['$scope', '$meteor', '$state', '$mdDialog',
    function($scope, $meteor, $state, $mdDialog) {

        $scope.user = $meteor.object(Meteor.users, { _id: Meteor.userId() }, false).subscribe('thisUser');
        $scope.images = $meteor.collectionFS(Images, false, Images).subscribe('images');

        $scope.navigate = function(routeName){
            $state.go(routeName);
        };

        $scope.save = function (user) {
            Meteor.users.update({ _id: $scope.user._id}, {
                $set: {
                    "first_name"    : $scope.user.first_name,
                    "last_name"     : $scope.user.last_name,
                    "gender"        : $scope.user.gender,
                    "nric"          : $scope.user.nric,
                    "mobileNo"      : $scope.user.mobileNo,
                    "dob"           : $scope.user.dob,
                    "address"       : $scope.user.address,
                    "qualifications": $scope.user.qualifications,
                    "commitmentPeriod": $scope.user.commitmentPeriod,
                    "preferredLocations": $scope.user.preferredLocations,
                    "teachingLevels": $scope.user.teachingLevels,
                    "experience"    : $scope.user.experience,
                    "identity"      : $scope.user.identity
                    }
                }
            );
        };
        
        $scope.openAddImageModal = function () {
            $mdDialog.show({
                controller: 'AddPhotoController',
                templateUrl: 'core/client/views/account/add-photo-modal.ng.html',
                scope: $scope.$new()
            }).then(function(image) {
                
                // Need to redefine this logic ... 20/06/15 
                // hand logic between image and user - TODO: change profile image to not be an array
                if (image) {
                    if (!$scope.profileImage) {
                        $scope.profileImage = [];
                    } else if ($scope.profileImage.length > 0) {
                        $scope.profileImage.push(image);
                    }
                }
            });
        };

        $scope.check = function() {
            for (var i = 0; i < $scope.images.length; i++) {
                $scope.images.remove({_id: $scope.images[i]._id});
            };
        };
    }
]);

angular.module('core').controller('AddPhotoController', ['$scope', '$meteor', '$rootScope', '$state', '$mdDialog',
    function($scope, $meteor, $rootScope, $state, $mdDialog) {

        $scope.images = $meteor.collectionFS(Images, false, Images).subscribe('images');

        $scope.addImages = function (files) {
          if (files.length > 0) {
            var reader = new FileReader();

            reader.onload = function (e) {
              $scope.$apply(function() {
                $scope.imgSrc = e.target.result;
                $scope.myCroppedImage = '';
              });
            };

            reader.readAsDataURL(files[0]);
          }
          else {
            $scope.imgSrc = undefined;
          }
        };

        $scope.close = $mdDialog.hide;

        $scope.saveCroppedImage = function() {
          if ($scope.myCroppedImage !== '') {
            var fileObject = new FS.File($scope.myCroppedImage);
            fileObject.metadata = { owner: $rootScope.currentUser._id, description: '' };

            $scope.images.save(fileObject).then(function(result) {
              $scope.uploadedImage = result[0]._id;
              $scope.answer(true);
            });
          }
        };

        $scope.answer = function(saveImage) {
          if (saveImage) {
            $mdDialog.hide($scope.uploadedImage);
          }
          else {
            if ($scope.uploadedImage) {
              $scope.images.remove($scope.uploadedImage._id);
            }

            $mdDialog.hide();
          }
        };

    }
]);