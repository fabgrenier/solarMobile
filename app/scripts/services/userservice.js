'use strict';

angular.module('solarAngularApp')
  .factory('Userservice', ['$cookieStore', function ($cookieStore) {
    
    var userId = function (promiseUser) {
        promiseUser($cookieStore.get('userAuth').firstName, $cookieStore.get('userAuth').lastName);
      };

    var isLogged = function(){
        return $cookieStore.get('login') && $cookieStore.get('password');
      };

    return {
        returnUserIdentity: userId,
        isLogged: isLogged
      };

  }]);
