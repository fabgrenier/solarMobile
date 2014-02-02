'use strict';

angular.module('solarAngularApp', [
  'ngCookies',
  'ngRoute',
  'base64'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
