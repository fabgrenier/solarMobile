'use strict';

angular.module('services')
  .factory('Consultservice', [function () {
  	var createCharts = function (reports){
  		var reportInChartFormat = new Array();
  		
  		for(var i = 0; i < reports.length; i++) {
  			var report = reports[i];
  			reportInChartFormat[i] = new Array();
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
  		createCharts: createCharts
  	}
  }]);
