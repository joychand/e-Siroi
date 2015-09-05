'use strict';

//SCHEDULER MODAL CONTROLLER 
(function () {
    angular.module('eSiroi.Web')
.controller('schedulerController', ['$scope', '$state', '$modalInstance', 'dept_dataFactory', '$filter',function ($scope, $state, $modalInstance, dept_dataFactory,$filter) {
    $scope.activeDate;
    $scope.scheduler = {};
    //$scope.scheduler.selectedDates = [new Date('22, 10, 2015').setHours(0, 0, 0, 0)];
    var datenow = new Date();
    dept_dataFactory.getDate().then(function (result) {
        datenow = result.data;
        console.log(datenow);
        datenow=$filter('date')(datenow,'yyyy-MM-dd');

        $scope.scheduler.selectedDates = [datenow];;
        //$scope.scheduler.selectedDates = [new Date().setHours(0, 0, 0, 0)];
        $scope.activeDate = $scope.scheduler.selectedDates[0];
        $scope.scheduler.minDate = new Date(2015,5,5);
        $scope.identity = angular.identity;

        $scope.removeFromSelected = function (dt) {
            $scope.scheduler.selectedDates.splice($scope.scheduler.selectedDates.indexOf(dt), 1);
        }
    });
    
    $scope.cancel = function () {
        $modalInstance.close();

    }
}]);
})();
