'use strict';

angular.module('controllers')
  .controller('MainCtrl', ['$scope', '$http', 'RequestbuilderService', '$location', 'config', '$log', function ($scope, $http, RequestbuilderService, $location, config, $log) {
    $scope.authenticate = function (login, password) {
        var parameters = RequestbuilderService.createPingParams(login, password);
        var uri = config.server+'/ping';
        $http.defaults.useXDomain = true;
        $http({
            method: 'GET',
            url: uri,
            params: parameters
          })
        .success(function () {
            RequestbuilderService.storeCredentials(login, password);
            $location.path('/installs');
          })
        .error(function () {
            $log.error('ping failed !');
          });
      };
  }]);
