'use strict';

angular.module('solarAngularApp')
  .controller('LogoutCtrl', ['$scope', '$location', '$cookieStore', function ($scope, $location, $cookieStore) {
  	$scope.logout = function (){
  		$cookieStore.remove('login');
  		$cookieStore.remove('password');
  		$cookieStore.remove('userAuth');  		
  		$location.path('/');
  	};

  	$scope.logout();

  }]);
