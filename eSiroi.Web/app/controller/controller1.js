(function () {
    'use strict';

    angular
        .module('app')
        .controller('controller1', ['$scope', controller1]);

    function controller1($scope) {
        $scope.title = 'controller1';

        activate();

        function activate() { }
    }
})();
