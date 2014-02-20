'use strict';

angular.module('controllers')
  .controller('MainCtrl', ['$scope', '$http', 'RequestbuilderService', '$location', 'config', 'Userservice', function ($scope, $http, RequestbuilderService, $location, config, Userservice) {
    if(Userservice.isLogged()){
      $location.path('/installs');
    }

    $scope.preventMultipleSubmit = false;

    $scope.authenticate = function (login, password) {
        $scope.failToRequest = false;
        $scope.preventMultipleSubmit = true;
        var parameters = RequestbuilderService.createPingParams(login, password);
        var uri = config.server+'/authenticate';
        $http.defaults.useXDomain = true;
        $http({
            method: 'GET',
            url: uri,
            params: parameters
          })
        .success(function (data) {
            $scope.preventMultipleSubmit = false;
            RequestbuilderService.storeCredentials(login, password, data);
            $location.path('/installs');
          })
        .error(function () {
            $scope.preventMultipleSubmit = false;
            $scope.badLogin = true;
            //$scope.failToRequest = true;
          });
      };
  }]);
