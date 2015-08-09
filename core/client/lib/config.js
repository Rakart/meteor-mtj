// Init the application configuration module for AngularJS application
ApplicationConfiguration = (function() {
  // Init module configuration options
  var applicationModuleName = 'mytutorjungle';
  var applicationModuleVendorDependencies = ['ui.router', 'ngMaterial', 'angular-meteor', 'ngFileUpload', 'ngImgCrop'];

  // Add a new vertical module
  var registerModule = function(moduleName, dependencies) {
    
    // Create angular module
    angular.module(moduleName, dependencies || []);

    // Add the module to the AngularJS configuration file
    angular.module(applicationModuleName).requires.push(moduleName);
  };

  return {
    applicationModuleName: applicationModuleName,
    applicationModuleVendorDependencies: applicationModuleVendorDependencies,
    registerModule: registerModule
  };
})();