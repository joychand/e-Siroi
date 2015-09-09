(function () {
    angular.module('eSiroi.Web')
    .controller('dept_OnlineDeedController', ['$scope', '$state', 'dept_sessionfactory', 'deptModalService', 'dept_dataFactory', function dept_OnlineDeedController($scope, $state, dept_sessionfactory, deptModalService, dept_dataFactory) {
        $scope.online = {}
        $scope.onlineData = function () {
            dept_dataFactory.getOnlineData($scope.online.ackno).then(function (result) {
                var appln = result.data[0];
                console.log(appln);
                dept_sessionfactory.putRow(appln);
                deptModalService.onlineAppln = {};
                angular.extend(deptModalService.onlineAppln, {
                    ackno: appln.ackno,
                    sro: appln.sro,
                    tsno: appln.ts,
                    tsyear: appln.tsyear,
                    trans_code: appln.trans_code,
                    status: appln.status

                });
                $state.go('department.content.updateform')
            })
            
        }
        
       

       
    }])
})();