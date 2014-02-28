'use strict';

angular.module('constants', []);
angular.module('services', ['constants']);
angular.module('controllers', ['services', 'constants']);

angular.module('solarAngularApp', [
  'ngCookies',
  'ngRoute',
  'ui.bootstrap',
  'highcharts-ng',
  'services',
  'controllers',
  'constants'
])
  .config(['$routeProvider', function ($routeProvider) {
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
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/logout', {
        templateUrl: 'views/logout.html',
        controller: 'LogoutCtrl'
      })
      .when('/unavailable', {
        templateUrl: 'views/unavailable.html',
        controller: 'UnavailableCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
