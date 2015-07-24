(function () {
    'use strict';

    angular
        .module('eRegApp')
        .controller('regApplyController', ['$scope', regApplyController]);

    function regApplyController($scope) {
        $scope.title = 'regApplyController';

        activate();

        function activate() { }
    }
})();
