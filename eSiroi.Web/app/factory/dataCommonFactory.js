(function () {
    'use strict';

    angular
        .module('app')
        .factory('dataCommonFactory', ['$http', dataCommonFactory]);

    function dataCommonFactory($http) {
        var service = {
            getData: getData
        };

        return service;

        function getData() { }
    }
})();