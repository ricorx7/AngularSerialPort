'use strict';

// Declare app level module which depends on filters, and services
//angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers', 'SerialPortCtrl']).		// Version will not work
angular.module('SerialPortApp', ['myApp.controllers', 'SerialPortCtrl', 'SerialPortWriterCtrl']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'SerialPortCtrl'});
    $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'SerialPortWriterCtrl'});
    $routeProvider.otherwise({redirectTo: '/view1'});
  }]);
	
