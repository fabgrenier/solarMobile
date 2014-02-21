'use strict';

angular.module('controllers')
  .controller('InstallsCtrl', ['$scope', '$route', '$location', 'Userservice', 'Consultservice',  function ($scope, $route, $location, Userservice, Consultservice) {
    $scope.init = function () {
      if(!Userservice.isLogged()){
        $location.path('/');
      } else {
        $scope.failToRequest = false;

        Consultservice.getInstallationList(
            function (data) {
                $scope.installations = data;
            },
            function (){
                $scope.failToRequest = true;
            },
            0
        );


        Userservice.returnUserIdentity(function (_firstName, _lastName){
            $scope.user = Object;
            $scope.user.firstName = _firstName;
            $scope.user.lastName = _lastName;
          });
      }
    };

    $scope.consult = function (deviceId) {
      $location.path('/consult/' + deviceId);
    };

    $scope.init();
  }]);
