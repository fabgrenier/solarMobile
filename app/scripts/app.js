'use strict';

angular.module('constants', []);
angular.module('services', ['constants']);
angular.module('controllers', ['services', 'constants']);

angular.module('solarAngularApp', [
  'ngCookies',
  'ngRoute',
  'services',
  'controllers',
  'constants'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/installs', {
        templateUrl: 'views/installs.html',
        controller: 'InstallsCtrl'
      })
      .when('/consult/:deviceId', {
        templateUrl: 'views/consult.html',
        controller: 'ConsultCtrl'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
