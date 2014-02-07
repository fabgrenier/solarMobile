'use strict';

angular.module('controllers')
  .controller('MainCtrl', ['$scope', '$http', 'RequestbuilderService', '$location', 'config', '$log', function ($scope, $http, RequestbuilderService, $location, config, $log) {
    $scope.preventMultipleSubmit = false;

    $scope.authenticate = function (login, password) {
        $scope.preventMultipleSubmit = true;
        var parameters = RequestbuilderService.createPingParams(login, password);
        var uri = config.server+'/ping';
        $http.defaults.useXDomain = true;
        $http({
            method: 'GET',
            url: uri,
            params: parameters
          })
        .success(function () {
          $scope.preventMultipleSubmit = false;
            RequestbuilderService.storeCredentials(login, password);
            $location.path('/installs');
          })
        .error(function () {
            $scope.preventMultipleSubmit = false;
            $scope.badLogin = true;
          });
      };
  }]);
