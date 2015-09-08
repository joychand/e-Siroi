(function () {
    angular.module('eSiroi.Web')
    .controller('dept_OnlineDeedController', ['$scope', '$state', 'dept_sessionfactory', 'deptModalService', 'dept_dataFactory', function dept_OnlineDeedController($scope, $state, dept_sessionfactory, deptModalService, dept_dataFactory) {
        $scope.online = {}
        $scope.onlineData = function () {
            dept_dataFactory.getOnlineData($scope.online.ackno).then(function (result) {
                var appln = result.data;
                dept_sessionfactory.putRow(appln);
                deptModalService.onlineAppln = {};
                angular.extend(deptModalService.onlineAppln, {
                    ackno: appln.ackno,
                    sro: appln.sro,
                    ts: appln.ts,
                    tyear: appln.tyear,
                    trans_code: appln.trans_code,
                    status: appln.status

                });
                $state.go('department.content.form')
            })
        }
        
       

       
    }])
})();