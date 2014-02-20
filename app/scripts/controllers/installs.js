'use strict';

angular.module('controllers')
  .controller('InstallsCtrl', ['$scope', '$route', 'RequestbuilderService', '$http', 'config', '$location', '$log', 'Userservice',  function ($scope, $route, RequestbuilderService, $http, config, $location, $log, Userservice) {
    $scope.init = function () {
      if(!Userservice.isLogged()){
        $location.path('/');
      } else {
        $scope.failToRequest = false;
        var parameters = RequestbuilderService.createGetInstallationsParams();
        var url = config.server+'/listDevices?'+parameters;
        $http.defaults.useXDomain = true;
        $http.get(url)
          .success(function (data) {
            $scope.installations = data;
          })
          .error(function (){
            $scope.failToRequest = true;
          });

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
