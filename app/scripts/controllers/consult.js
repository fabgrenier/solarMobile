'use strict';

angular.module('controllers')
  .controller('ConsultCtrl', ['$scope', '$routeParams', '$location', '$http', '$log', 'RequestbuilderService', 'config', 'Consultservice', function ($scope, $routeParams, $location, $http, $log, RequestbuilderService, config, Consultservice) {
	if(!$routeParams.deviceId) {
		$location.path('/');
	} else {
		$scope.deviceId = $routeParams.deviceId;

		$scope.getMeasures = function () {

	        $scope.failToRequest = false;
			var parameters = RequestbuilderService.createGetMeasuresParams($scope.deviceId);
      var url = config.server+'/getDeviceProduction?'+parameters;
	    $http.defaults.useXDomain = true;
	    $http.get(url)
	          .success(function (data) {
	            $scope.reports = data.records;
	            $scope.getTotalMeasures();
	            $scope.chartConfig = Consultservice.createCharts(data.records);
	          })
	          .error(function (){
	          	$scope.failToRequest = true;
	          });
		};

		$scope.getTotalMeasures = function() {
			$scope.sumMeasures = 0;
			$scope.reports.forEach(function(report) {
				report.measure = parseFloat(report.measure);
				report.measureDate = new Date(report.measureDate);
				$scope.sumMeasures = $scope.sumMeasures + report.measure;
			});
			$scope.startPeriod = $scope.reports[0].measureDate;
			$scope.endPeriod = $scope.reports[$scope.reports.length -1].measureDate;
			$scope.sumMeasures = parseFloat($scope.sumMeasures) / 1000 ;
		};

		$scope.getMeasures();
	}
}]);
