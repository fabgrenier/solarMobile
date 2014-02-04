'use strict';

angular.module('constants', []);
angular.module('constants')
  .constant('config', { server: 'https://ws-test.rtone.fr/solar/webservices'});

angular.module('services', []);
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
      .otherwise({
        redirectTo: '/'
      });
  });
