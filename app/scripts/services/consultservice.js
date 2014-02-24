'use strict';

angular.module('services')
    .factory('Consultservice', ['$http','RequestbuilderService', 'config', function ($http, RequestbuilderService, config ) {

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
                            }
                            , (retry * 1000));
                    } else {
                        promiseError();
                    }
                });

        };

        var getProduction = function (deviceId, promiseSuccess, promiseError, retry){
            var parameters = RequestbuilderService.createGetMeasuresParams(deviceId);
            var uri = config.server+'/getDeviceProduction?'+parameters;
            $http.defaults.useXDomain = true;
            $http.get(uri)
                .success(promiseSuccess)
                .error(function (data, status){
                    if((status === 404 || status === 400) && retry < 3){
                        retry ++;
                        setTimeout(
                            function (){
                                getProduction(deviceId, promiseSuccess, promiseError, retry);
                            }
                            , (retry * 1000));
                    } else {
                        promiseError();
                    }
                });

        };

        var createCharts = function (reports){
            var reportInChartFormat = [];

            for(var i = 0; i < reports.length; i++) {
                var report = reports[i];
                reportInChartFormat[i] = [];
                reportInChartFormat[i][0] = new Date(report.measureDate).getTime();
                reportInChartFormat[i][1] = parseFloat(report.measure);
            }

            var highchartsNgConfig = {
                //This is not a highcharts object. It just looks a little like one!

                options: {
                    //This is the Main Highcharts chart config. Any Highchart options are valid here.
                    //will be ovverriden by values specified below.
                    chart: {
                        type: 'column'
                    },
                    tooltip: {
                        style: {
                            padding: 10,
                            fontWeight: 'bold'
                        }
                    },
                },

                //The below properties are watched separately for changes.

                //Series object - a list of series using normal highcharts series options.
                series: [{
                    name: 'Production (Wh)',
                    data: reportInChartFormat
                }],
                //Title configuration
                title: {
                    text: 'Production par jour'
                },
                //Boolean to control showng loading status on chart
                loading: false,
                //Configuration for the xAxis. Currently only one x axis can be dynamically controlled.
                //properties currentMin and currentMax provied 2-way binding to the chart's maximimum and minimum
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
                    title: {text: 'Wh'},
                    min: 0
                },
                //Whether to use HighStocks instead of HighCharts. Defaults to false.
                useHighStocks: false
            };

            return highchartsNgConfig;
        };

        return {
            createCharts: createCharts,
            getInstallationList : getInstallationList,
            getProduction: getProduction
        }
    }]);
