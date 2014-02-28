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

            return 'login='+login+'&mps='+mdpDigest+'&requestDate='+currentdate;

          };

        var callGetInstallations = function(){
            var login = $cookieStore.get('login');
            var password = $cookieStore.get('password');
          
            return callLogin(login, password);
          };

        var createGetMeasuresParams = function(serialNumber, dates){
            var url = callGetInstallations();
            var sn = '&serialNumber='+serialNumber;
            
            return url + sn + dates;
          };

        return {
            createPingParams : callLogin,
            createGetInstallationsParams : callGetInstallations,
            createGetMeasuresParams : createGetMeasuresParams
          };
      }]);
