'use strict';

//SCHEDULER MODAL CONTROLLER 
(function () {
    angular.module('eSiroi.Web')
.controller('schedulerController', ['$scope', '$state', '$modalInstance', 'dept_dataFactory', '$filter', 'row',function ($scope, $state, $modalInstance, dept_dataFactory,$filter,row) {
    $scope.activeDate;
    $scope.scheduler = {};
    
    var datenow = new Date();
    dept_dataFactory.getDate().then(function (result) {
        var availDate = result.data;
        
        
        $scope.scheduler.selectedDates = [new Date(availDate).setHours(0, 0, 0, 0)];
        
        
        $scope.activeDate = $filter('date')($scope.scheduler.selectedDates[0], 'yyyy-MM-dd');
        
        $scope.scheduler.minDate = new Date(availDate);
        $scope.identity = angular.identity;

        $scope.removeFromSelected = function (dt) {
            $scope.scheduler.selectedDates.splice($scope.scheduler.selectedDates.indexOf(dt), 1);
        }
    });
    
    $scope.cancel = function () {
        
        $modalInstance.close();

    }
    $scope.fixed = function () {
        var appntModel = {};
        angular.extend(appntModel, {
            tsno: row.ts,
            tsyear: row.tYear,
            sro: row.roCode,
            date1: new Date($scope.scheduler.selectedDates[0]),
            date2: new Date($scope.scheduler.selectedDates[1]),
            date3: new Date($scope.scheduler.selectedDates[2])
        });
        //console.log(appntModel)
        dept_dataFactory.postAppointment(appntModel).then(function (result) {
            var appointment = result.data;
            console.log(appointment)
            var date1 = $filter('date')(appointment[0].date1, 'dd-MMM-yyyy');
            console.log(date1);
          
           
        })
        $modalInstance.close();
    }
}]);
})();
