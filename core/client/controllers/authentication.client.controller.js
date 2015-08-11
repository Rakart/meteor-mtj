angular.module('core').controller('AuthenticationController', ['$scope', '$meteor', '$state',
	function($scope, $meteor, $state) {

        var vm = this;

        vm.credentials = {
            email: '',
            password: '' 

        };

        vm.error = '';

        vm.login = function (){
            $meteor.loginWithPassword(vm.credentials.email, vm.credentials.password).then(
                function(){
                    $state.go('edit-profile');
                },
                function(err){
                    vm.error = 'Login error: ' + err;
                }
            );
        };

        vm.signup = function (){
            
            Accounts.createUser({email: vm.credentials.email, password: vm.credentials.password}, 
                function(err){
                if (err) {
                    console.log('Error creating user: ', err);
                } else {
                    var userId = Meteor.user()._id;
                    Meteor.users.update(userId, {$set: {identity: $scope.identity}});
                    $state.go('edit-profile');
                }
            });            
        };
    }
]);
