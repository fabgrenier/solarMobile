'use strict';

angular.module('controllers')
  .controller('MainCtrl', ['$scope', 'RequestbuilderService', '$location', 'config', 'Userservice', function ($scope, RequestbuilderService, $location, config, Userservice) {
    if(Userservice.isLogged()){
      $location.path('/installs');
    }
    $scope.hideLogout = true;
    $scope.preventMultipleSubmit = false;
    $scope.retryQuery = 0;

    $scope.authenticate = function (login, password) {
        $scope.failToRequest = false;
        $scope.preventMultipleSubmit = true;
        var parameters = RequestbuilderService.createPingParams(login, password);
        var uri = config.server+'/authenticate';
        Userservice.getAuthenticate(uri, parameters,
            function (data) {
                $scope.preventMultipleSubmit = false;
                RequestbuilderService.storeCredentials(login, password, data);
                $location.path('/installs');
                $scope.retryQuery = 0;
            },
            function (data) {
                    $scope.preventMultipleSubmit = false;
                    $scope.badLogin = true;
                    //$scope.failToRequest = true;
            },
            0
        );

      };
  }]);
