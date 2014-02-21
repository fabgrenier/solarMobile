'use strict';

angular.module('controllers')
  .controller('MainCtrl', ['$scope', '$location', 'Userservice', function ($scope, $location, Userservice) {
    if(Userservice.isLogged()){
      $location.path('/installs');
    }
    $scope.hideLogout = true;
    $scope.preventMultipleSubmit = false;
    $scope.retryQuery = 0;

    $scope.authenticate = function (login, password) {
        $scope.failToRequest = false;
        $scope.preventMultipleSubmit = true;
        Userservice.getAuthenticate(login, password,
            function (data) {
                $scope.preventMultipleSubmit = false;
                Userservice.storeCredentials(login, password, data);
                $location.path('/installs');
            },
            function () {
                    $scope.preventMultipleSubmit = false;
                    $scope.badLogin = true;
                    //$scope.failToRequest = true;
            },
            0
        );

      };
  }]);
