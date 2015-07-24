(function () {
    'use strict';

    angular
        .module('app')
        .controller('dept_VapplController', ['$scope', dept_VapplController]);

    function dept_VapplController($scope) {
        $scope.title = 'dept_VapplController';

        activate();

        function activate() { }
    }
})();
