'use strict';

angular.module('services')
  .factory('RequestbuilderService', ['$filter', '$cookieStore', function ($filter, $cookieStore) {
        var getUtcCurrentDate = function (){
            var now = new Date();
            var nowUtc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
            return $filter('date')(nowUtc, 'yyyy-MM-dd\'T\'HH:mm:ss');

          };

        var getMdpDigest = function (login, password, currentdate) {
            var mdpsha1 = CryptoJS.SHA1(login+''+password+''+currentdate);
            return mdpsha1.toString(CryptoJS.enc.Base64);
          };

        var callLogin = function(login, password){
            var currentdate = getUtcCurrentDate();
            var mdpDigest = getMdpDigest(login, password, currentdate);
            return {login: login, mps: mdpDigest, requestDate: currentdate};

          };

        var storeCredentials = function (login, password, userAuth){
            $cookieStore.put('login', login);
            $cookieStore.put('password', password);
            $cookieStore.put('userAuth', userAuth);
          };

        var callGetInstallations = function(){
            var login = $cookieStore.get('login');
            var password = $cookieStore.get('password');
            var currentdate = getUtcCurrentDate();
            var mdpDigest = getMdpDigest(login, password, currentdate);

            return 'login='+login+'&mps='+mdpDigest+'&requestDate='+currentdate;
          };

        var createGetMeasuresParams = function(serialNumber){
            var url = callGetInstallations();
            var sn = '&serialNumber='+serialNumber;
            var startDate = '&startDate=2013-06-14T00:00:00';
            var endDate = '&endDate=2013-06-21T00:00:00';
            var step = '&step=d';

            return url + sn + startDate + endDate + step;
          };

        return {
            createPingParams : callLogin,
            createGetInstallationsParams : callGetInstallations,
            storeCredentials : storeCredentials,
            createGetMeasuresParams : createGetMeasuresParams
          };
      }]);
