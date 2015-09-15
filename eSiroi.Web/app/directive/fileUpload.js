(function () {
    angular.module('eSiroi.Web')
.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);
})();

// file upload service
(function () {
    angular.module('eSiroi.Web')
    .service('fileupLoading', ['$http','$rootScope','deptModalService', fileupLoading]);
    function fileupLoading($http, $rootScope, deptModalService) {
        this.uploadFileToUrl = function (file, uploadUrl) {
            var fd = new FormData();
            fd.append('file', file);
            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
               
               
            })
            .success(function (result) {
                $rootScope.$broadcast('upLoadFinish');
                deptModalService.onlineAppln.filePath = result;
            })
            .error(function () {
                $rootScope.$broadcast('upLoadError');
            });
        }
    }

})();