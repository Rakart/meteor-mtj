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
                    $state.go('home');
                },
                function(err){
                    vm.error = 'Login error - ' + err;
                }
            );
        };

        vm.signup = function (){
            $meteor.createUser(vm.credentials).then(
                function(){
                    $state.go('home');
                },
                function(err){
                    vm.error = 'Registration error - ' + err;
                }
            );
        };
    }
]);
