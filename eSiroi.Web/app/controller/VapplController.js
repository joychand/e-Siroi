(function () {
    'use strict';

    angular
        .module('app')
        .controller('VapplController', ['$scope', VapplController]);

    function VapplController($scope) {
        $scope.title = 'VapplController';

        activate();

        function activate() { }
    }
})();
