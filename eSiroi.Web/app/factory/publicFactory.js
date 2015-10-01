'use strict';
(function(){
    angular.module('eSiroi.Web')
    .factory('publicFactory', ['$http', 'eSiroiWebSettings', function ($http, eSiroiWebSettings) {

        var publicFactory = {};
        var urlBase = eSiroiWebSettings.apiResrcServiceBaseUri + 'api/Public/';
        publicFactory.getSchedules = function (applnObject) {
            return $http({
                method: 'POST',
                url: urlBase + 'getSchedules',
                data:applnObject
            })
        }

        return publicFactory;
    }]);
})();
