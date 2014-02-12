'use strict';

angular.module('controllers')
  .controller('InstallsCtrl', ['$scope', '$route', 'RequestbuilderService', '$http', 'config', '$location', '$log', function ($scope, $route, RequestbuilderService, $http, config, $location, $log) {
    $scope.init = function () {
      if(!RequestbuilderService.isLogged()){
        $location.path('/');
      } else {
        var parameters = RequestbuilderService.createGetInstallationsParams();
        var url = config.server+'/listDevices?'+parameters;
        $http.defaults.useXDomain = true;
        $http.get(url)
          .success(function (data) {
            $scope.installations = data;
          })
          .error(function (){
            $log.error('get installations failed !');
          });
      }
    };

    $scope.consult = function (deviceId) {
      $location.path('/consult/' + deviceId);
    };

    $scope.init();
  }]);
