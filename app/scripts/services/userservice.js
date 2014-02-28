'use strict';

angular.module('services')
  .factory('Userservice', ['$cookieStore', '$http', 'config', 'RequestbuilderService', function ($cookieStore, $http,  config, RequestbuilderService) {
    
    var userId = function (promiseUser) {
        promiseUser($cookieStore.get('userAuth').firstName, $cookieStore.get('userAuth').lastName);
      };

    var isLogged = function(){
        return $cookieStore.get('login') && $cookieStore.get('password');
      };

    var storeCredentials = function (login, password, userAuth){
        $cookieStore.put('login', login);
        $cookieStore.put('password', password);
        $cookieStore.put('userAuth', userAuth);
      };

    var getAuthenticate = function(login, password, promiseSuccess, promiseError, retry){
        var parameters = RequestbuilderService.createPingParams(login, password);
        var uri = config.server+'/authenticate?'+parameters;
        $http.defaults.useXDomain = true;
        $http.get(uri)
            .success(promiseSuccess)
            .error(function (data, status){
                if((status === 404 || status === 400) && retry < 3){
                  retry ++;
                  setTimeout(
                    function (){
                        getAuthenticate(login, password, promiseSuccess, promiseError, retry);
                      },
                    (retry * 1000));
                } else {
                  promiseError();
                }
              }
            );
      };

    return {
        returnUserIdentity: userId,
        isLogged: isLogged,
        storeCredentials : storeCredentials,
        getAuthenticate: getAuthenticate
      };

  }]);
