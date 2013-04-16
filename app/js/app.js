'use strict';


// Declare app level module which depends on filters, and services
angular.module('SerialPortApp', ['SerialPortApp.filters', 'SerialPortApp.services', 'SerialPortApp.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'SerialPortCtrl'});
    $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'SerialPortSettingsCtrl'});
    $routeProvider.otherwise({redirectTo: '/view1'});
  }]);
