'use strict';

angular.module('controllers')
  .controller('ConsultCtrl', ['$scope', '$routeParams', '$location', '$http', '$log', 'RequestbuilderService', 'config', function ($scope, $routeParams, $location, $http, $log, RequestbuilderService, config) {
	if(!$routeParams.deviceId) {
		$location.path('/');
	} else {
		$scope.deviceId = $routeParams.deviceId;

		$scope.getMeasures = function () {
			var parameters = RequestbuilderService.createGetMeasuresParams($scope.deviceId);
      var url = config.server+'/getDeviceProduction?'+parameters;
	    $http.defaults.useXDomain = true;
	    $http.get(url)
	          .success(function (data) {
	            $scope.reports = data.records;
	            $scope.getTotalMeasures();
	          })
	          .error(function (){
	            $log.error('get reports failed !');
	          });
		};

		$scope.getTotalMeasures = function() {
			$scope.sumMeasures = 0;
			$scope.reports.forEach(function(report) {
				$scope.sumMeasures = $scope.sumMeasures + parseFloat(report.measure);
			});
			$scope.sumMeasures = parseFloat($scope.sumMeasures) / 1000 ;
		};

		$scope.getMeasures();
	}
}]);
