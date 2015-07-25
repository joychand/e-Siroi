(function () {
    'use strict';

    angular
        .module('eSiroi.Web')
        .controller('regApplyController', ['$scope', regApplyController]);

    function regApplyController($scope) {
        $scope.title = 'regApplyController';

        activate();

        function activate() { }
    }
})();
