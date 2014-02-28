'use strict';

angular.module('controllers')
  .controller('ConsultCtrl', ['$scope', '$routeParams', '$location', 'Consultservice', function ($scope, $routeParams, $location, Consultservice) {
	$scope.pb = {progress: 0};
	$scope.loading = true;
	if(!$routeParams.deviceId) {
		$location.path('/');
	} else {
		$scope.deviceId = $routeParams.deviceId;
		$scope.getMeasures = function (period) {
	      $scope.failToRequest = false;
	      $scope.pb.progress = 30;
          Consultservice.getProduction($scope.deviceId, period, $scope.pb,
              function (data) {
                $scope.pb.progress += 10;
                $scope.reports = data.records;
                $scope.getTotalMeasures();

                var type = 'column';
                $scope.dateFormat = 'shortDate';
                if($scope.period === 'yesterday'){
                  type = 'line';
                  $scope.dateFormat = 'shortTime';
                }

                $scope.pb.progress += 10;
                if($scope.chartConfig){
                  Consultservice.updateCharts(data.records, type, $scope.chartConfig);
                } else {
                  $scope.chartConfig = Consultservice.createCharts(data.records, type);
                }
                $scope.loading = false;
              },
              function (){
                $scope.failToRequest = true;
                $scope.loading = false;
              },
              0
            );
          };
        $scope.updatePeriod = function() {
            $scope.loading = true;
            $scope.getMeasures($scope.period);
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

		$scope.period = 'yesterday';
		$scope.getMeasures('yesterday');
	}
}]);
