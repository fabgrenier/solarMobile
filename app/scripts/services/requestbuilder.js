'use strict';

angular.module('solarAngularApp')
  .service('RequestbuilderService', ['$filter', '$base64', function RequestbuilderService($filter, $base64) {

        var createPingParams = function(login, password){
            var currentdate = $filter('date')(new Date(), "yyyy-MM-dd'T'HH-mm-ss");

            var mdpDigest = CryptoJS.SHA1(currentdate+login+password);
            mdpDigest = $base64.encode(mdpDigest);

            return "?login"+login+"&mdp="+mdpDigest+"&requestDate="+currentdate;

        };

        return {
            createPingParams : 'createPingParams'
            };

  }]);
