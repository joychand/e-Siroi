'use strict';
(function () {
    angular.module('eSiroi.Web')
.controller('finaluploadController',['$scope', '$state', function ($scope, $state) {
    $scope.upload = {};
    $scope.upload.show = false;
    $scope.getAppln = function () {
        $scope.upload.show = true;
    }
}])
})();