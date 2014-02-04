'use strict';

angular.module('controllers')
  .controller('ConsultCtrl', ['$scope', '$routeParams', function ($scope, $routeParams) {
	$scope.deviceId = $routeParams.deviceId;

}]);
