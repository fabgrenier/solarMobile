'use strict';

angular.module('services')
  .factory('Userservice', ['$cookieStore', '$http', function ($cookieStore, $http) {
    
    var userId = function (promiseUser) {
        promiseUser($cookieStore.get('userAuth').firstName, $cookieStore.get('userAuth').lastName);
      };

    var isLogged = function(){
        return $cookieStore.get('login') && $cookieStore.get('password');
      };

    var getAuthenticate = function(uri, parameters, promiseSuccess, promiseError, retry){
        $http.defaults.useXDomain = true;
        $http({
            method: 'GET',
            url: uri,
            params: parameters
          })
        .success(promiseSuccess)
        .error(function(data, status){
                if((status === 404 || status === 400) && retry < 3){
                  retry ++;
                  getAuthenticate(uri, parameters, promiseSuccess, promiseError, retry);
                } else {
                  promiseError();
                }
              }
        );
      };

    return {
        returnUserIdentity: userId,
        isLogged: isLogged,
        getAuthenticate: getAuthenticate
      };

  }]);
