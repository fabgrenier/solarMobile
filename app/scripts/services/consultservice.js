'use strict';

angular.module('services')
    .factory('Consultservice', ['$http', '$filter', 'RequestbuilderService', 'config', function ($http, $filter, RequestbuilderService, config ) {

        var getInstallationList = function (promiseSuccess, promiseError, retry){
            var parameters = RequestbuilderService.createGetInstallationsParams();
            var uri = config.server+'/listDevices?'+parameters;
            $http.defaults.useXDomain = true;
            $http.get(uri)
                .success(promiseSuccess)
                .error(function (data, status){
                    if((status === 404 || status === 400) && retry < 3){
                      retry ++;
                      setTimeout(
                          function (){
                            getInstallationList(promiseSuccess, promiseError, retry);
                          },
                          (retry * 1000));
                    } else {
                      promiseError();
                    }
                  });

          };

        var createDatesAndStepForPeriod = function(period) {
            var dates = '';
            var now = new Date();
            var nowUtc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  0, 0, 0);
            nowUtc.setMilliseconds(nowUtc.getMilliseconds() - (60 * 60 * 1000));

            if(period === 'yesterday'){
              dates = '&step=h&endDate=' + $filter('date')(nowUtc, 'yyyy-MM-dd\'T\'HH:mm:ss');

              nowUtc.setMilliseconds(nowUtc.getMilliseconds() - (24 * 60 * 60 * 1000));
              dates = dates + '&startDate=' + $filter('date')(nowUtc, 'yyyy-MM-dd\'T\'HH:mm:ss');

            } else if (period === '7lastdays') {
              dates = '&step=d&endDate=' + $filter('date')(nowUtc, 'yyyy-MM-dd\'T\'HH:mm:ss');

              nowUtc.setMilliseconds(nowUtc.getMilliseconds() - (7 * 24 * 60 * 60 * 1000));
              dates = dates + '&startDate=' + $filter('date')(nowUtc, 'yyyy-MM-dd\'T\'HH:mm:ss');

            } else if (period === '30lastdays') {
              dates = '&step=d&endDate=' + $filter('date')(nowUtc, 'yyyy-MM-dd\'T\'HH:mm:ss');

              nowUtc.setMilliseconds(nowUtc.getMilliseconds() - (30 * 24 * 60 * 60 * 1000));
              dates = dates + '&startDate=' + $filter('date')(nowUtc, 'yyyy-MM-dd\'T\'HH:mm:ss');
               
            }
            return dates;
          };

        var getProduction = function (deviceId, period, progressBar, promiseSuccess, promiseError, retry){

            var periodDates = createDatesAndStepForPeriod(period);
            var parameters = RequestbuilderService.createGetMeasuresParams(deviceId, periodDates);
            var uri = config.server+'/getDeviceProduction?'+parameters;
            $http.defaults.useXDomain = true;
            $http.get(uri)
                .success(promiseSuccess)
                .error(function (data, status){
                    if((status === 404 || status === 400) && retry < 3){
                      progressBar.progress += 20;
                      retry ++;
                      setTimeout(
                        function (){
                            getProduction(deviceId, period, progressBar, promiseSuccess, promiseError, retry);
                          },
                        (retry * 1000));
                    } else {
                      promiseError();
                    }
                  });

          };

        var updateCharts = function (reports, type, chartConfig){
            var reportInChartFormat = [];

            for(var i = 0; i < reports.length; i++) {
              var report = reports[i];
              reportInChartFormat[i] = [];
              reportInChartFormat[i][0] = new Date(report.measureDate).getTime();
              reportInChartFormat[i][1] = parseFloat(report.measure);
            }

            chartConfig.options.chart.type = type;
            chartConfig.series[0].data = reportInChartFormat;
          };

        var createCharts = function (reports, type){
            var reportInChartFormat = [];

            for(var i = 0; i < reports.length; i++) {
              var report = reports[i];
              reportInChartFormat[i] = [];
              reportInChartFormat[i][0] = new Date(report.measureDate).getTime();
              reportInChartFormat[i][1] = parseFloat(report.measure);
            }

            return {
                //This is not a highcharts object. It just looks a little like one!

                options: {
                    //This is the Main Highcharts chart config. Any Highchart options are valid here.
                    //will be ovverriden by values specified below.
                    chart: {
                        type: type
                      },
                    tooltip: {
                        style: {
                            padding: 10,
                            fontWeight: 'bold'
                          }
                      }
                  },
                series: [{
                    name: 'Production (Wh)',
                    data: reportInChartFormat
                  }],
                //Title configuration
                title: {
                    text: 'Your production in a smart chart'
                  },
                //Boolean to control showng loading status on chart
                loading: false,
                xAxis: {
                    type: 'datetime',
                    title: {text: ''},
                    dateTimeLabelFormats: { // don't display the dummy year
                        month: '%e. %b',
                        year: '%b'
                      }
                  },
                yAxis: {
                    type: 'number',
                    title: {text: ''},
                    min: 0
                  },
                useHighStocks: false
              };
          };

        return {
            createCharts: createCharts,
            getInstallationList : getInstallationList,
            getProduction: getProduction,
            updateCharts: updateCharts
          };
      }]);
