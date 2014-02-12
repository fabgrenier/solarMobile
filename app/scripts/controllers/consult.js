'use strict';

angular.module('controllers')
  .controller('ConsultCtrl', ['$scope', '$routeParams', '$location', function ($scope, $routeParams, $location) {
	if(!$routeParams.deviceId) {
		$location.path('/');
	} else {
		$scope.deviceId = $routeParams.deviceId;
	}
}]);
