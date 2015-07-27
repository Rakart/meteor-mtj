// Setting up routes
angular.module('core').config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
	function($stateProvider, $urlRouterProvider, $locationProvider) {
		
		// Redirect to home view when route not found
		$urlRouterProvider.
		otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'core/client/views/home.client.ng.html',
			controller: 'HomeController'
		}).
		state('pricing', {
			url: '/pricing',
			templateUrl: 'core/client/views/pricing.client.ng.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'core/client/views/account/signup.client.ng.html',
			controller: 'AuthenticationController',
			controllerAs: 'AC'
		}).
		state('login', {
			url: '/login',
			templateUrl: 'core/client/views/account/login.client.ng.html',
			controller: 'AuthenticationController',
			controllerAs: 'AC'
		}).
		state('logout', {
		    url: '/logout', 
		    resolve: {
		    'logout': ['$meteor', '$state', function($meteor, $state) {
		        return $meteor.logout().then(function(){
		                $state.go('home').then(function() {
		                	console.log('You have been successfully logged out');
		                });
		            }, function(err){
		                console.log('logout error - ', err);
		            });
		        }]
		   }
		}).
		state('edit-profile', {
			url: '/edit-profile',
			templateUrl: 'core/client/views/account/edit-profile.client.ng.html',
			controller: 'ProfileController'
		}).
		state('jungle', {
			url: '/jungle',
			templateUrl: 'jungle/client/views/jungle.client.ng.html',
			controller: 'JungleController',
			resolve: {
				'subscribe': [
				'$meteor', function($meteor) {
					return $meteor.subscribe('users');
				}]
			}
		}).
		state('favourites', {
			url: '/favourites',
			templateUrl: 'core/client/views/account/favourites.client.ng.html',
			controller: 'FavouritesController'
		});
	}
]);
