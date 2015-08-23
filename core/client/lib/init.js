//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config([
	'$locationProvider', '$mdThemingProvider', '$mdIconProvider',
	function($locationProvider, $mdThemingProvider, $mdIconProvider) {
		//$locationProvider.html5Mode(true).hashPrefix('!');

		$mdThemingProvider.theme('default')
			.primaryPalette('cyan', {
				'default': '500', // by default use shade 400 from the pink palette for primary intentions
				'hue-1': '50', // use shade 100 for the <code>md-hue-1</code> class
				'hue-2': '100', // use shade 600 for the <code>md-hue-2</code> class
				'hue-3': '300' // use shade A100 for the <code>md-hue-3</code> class
			})
			// If you specify less than all of the keys, it will inherit from the
			// default shades
			.accentPalette('indigo', {
				'default': '500', // use shade 200 for default, and keep all other shades the same
				'hue-1': '800',
				'hue-2': '900'
			});
			// .backgroundPalette('light-blue', {
			// 	'default': '50'
			// });

		// Register icons
		$mdIconProvider
			.icon('menu', 		'core/public/img/icons/ic_menu_white_48px.svg', 48)
			.icon('black-book', 'core/public/img/icons/ic_book_black_48px.svg', 48)
			.icon('time',		'core/public/img/icons/ic_access_time_black_48px.svg', 48)
			.icon('user', 		'core/public/img/icons/ic_person_black_48px.svg', 48)
			.icon('lock', 		'core/public/img/icons/ic_lock_black_48px.svg', 48)
			.icon('email', 		'core/public/img/icons/ic_email_black_48px.svg', 48)
			.icon('usd', 		'core/public/img/icons/ic_attach_money_black_48px.svg', 48)
			.icon('search', 	'core/public/img/icons/ic_search_black_48px.svg', 48);
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
