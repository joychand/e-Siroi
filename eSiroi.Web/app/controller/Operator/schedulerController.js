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
        var datenow = result.data;
        
        //console.log(datenow);
        //datenow = $filter('date')(datenow, 'yyyy-MM-dd');
        //console.log(datenow);
        //console.log(new Date(datenow).setHours(0, 0, 0, 0));
        //console.log(new Date(2015,10,6));
        //console.log(new Date('2015,10,6').setHours(0, 0, 0, 0));
        $scope.scheduler.selectedDates = [new Date(datenow).setHours(0, 0, 0, 0)];
        console.log($scope.scheduler.selectedDates[0]);
        //$scope.scheduler.selectedDates = [new Date().setHours(0, 0, 0, 0)];
        $scope.activeDate = $filter('date')($scope.scheduler.selectedDates[0], 'yyyy-MM-dd');
        console.log($scope.activeDate);
        console.log(new Date($scope.activeDate).setHours(0, 0, 0, 0));
        $scope.scheduler.minDate = new Date(datenow);
        $scope.identity = angular.identity;

        $scope.removeFromSelected = function (dt) {
            $scope.scheduler.selectedDates.splice($scope.scheduler.selectedDates.indexOf(dt), 1);
        }
    });
    
    $scope.cancel = function () {
        var d = new Date($scope.scheduler.selectedDates[1]);
        var d1 = $filter('date')(d, 'yyyy-MM-ddTHH:mmZ', 'UTC');
        var d2 = $filter('date')(d, 'yyyy-MM-ddTHH:mmZ');
        console.log(d);
        console.log(d1);
        console.log(d2);
        $modalInstance.close();

    }
    $scope.fixed = function () {
        var d = $filter('date')($scope.scheduler.selectedDates[0], 'yyyy-MM-ddTHH:mm:ssZ');
        console.log(d);
        dept_dataFactory.postDate(d).then(function (result) {
            console.log(result.data);
        })
    }
}]);
})();
