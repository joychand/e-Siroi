(function () {
    'use strict';

    angular
        .module('app')
        .factory('dataCommonFactory', ['$http', 'eSiroiWebSettings', dataCommonFactory]);

    function dataCommonFactory($http,eSiroiWebSettings) {
        var service = {
            getData: getData
        };

        return service;

        function getData() { }
    }
})();