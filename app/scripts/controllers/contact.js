'use strict';

angular.module('solarAngularApp')
  .controller('ContactCtrl', ['$scope', '$log', function ($scope, $log) {
    $scope.sendContactMsg = function() {
    	$log.debug("sendContactMsg");
    	$scope.showalert = true;
    }
  }]);
