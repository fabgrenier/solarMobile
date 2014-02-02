'use strict';

angular.module('solarAngularApp')
  .controller('MainCtrl', ['$scope', '$http', 'RequestbuilderService', function ($scope, $http, RequestbuilderService) {
    $scope.authenticate = function (login, password) {
        var parameters = RequestbuilderService.createPingParams(login, password);
        $http.get("https://pvmeter.com/solar/webservices/ping?"+parameters)
            .success(function (data) {
                alert('ping succeed !');
            })
            .error(function (error){
                alert('ping failed !');
            });
    };
  }]);
