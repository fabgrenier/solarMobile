'use strict';

angular.module('solarAngularApp')
  .factory('Userservice', ['$cookies', function ($cookies) {
    
    var userId = function (promiseUser) {
    	promiseUser($cookies.userAuth.firstName, $cookies.userAuth.lastName);
    };

    return {
    	returnUserIdentity: userId
    }

  }]);
