//(function () {
//    'use strict';

//    angular.module('eSiroi.Web')
//    .factory('timestampMarker', ['$q',function ($q) {
//        var timestampMarker = {
//            request: function (config) {
//                config.requestTimestamp = new Date().getTime();
//                return config;
//            },
//            response: function (response) {
                
//                response.config.responseTimestamp = new Date().getTime();
//                return response;
//            },
//            responseError: function (response) {
//                if (response.status === 404) {
//                    console.log("resource not found");
//                    return $q.reject(response);
//                }
//            }


//        };
//        return timestampMarker;
//    }]);
//    angular.module('eSiroi.Web').config(['$httpProvider', function ($httpProvider) {
//        $httpProvider.interceptors.push('timestampMarker');
//    }]);
//})();

//(function () {
//    'use strict';

//    angular.module('eSiroi.Web')
//    .factory('interceptor', ['$q', function ($q) {
//        var interceptor = {
//            request: function (config) {
               
//            },
//            response: function (response) {

//                response.config.responseTimestamp = new Date().getTime();
//                return response;
//            },
//            responseError: function (response) {
//                if (response.status === 404) {
//                    console.log("resource not found");
//                    return $q.reject(response);
//                }
//            }


//        };
//        return interceptor;
//    }]);
//    angular.module('eSiroi.Web').config(['$httpProvider', function ($httpProvider) {
//        $httpProvider.interceptors.push('interceptor');
//    }]);
//})();


//'use strict';







//// Declare app level module which depends on filters, and services
//var app = angular.module('myApp', ['mongolabResourceHttp', 'data.services']);

//app.constant('_START_REQUEST_', '_START_REQUEST_');
//app.constant('_END_REQUEST_', '_END_REQUEST_');

//app.config(['$httpProvider', '_START_REQUEST_', '_END_REQUEST_', function ($httpProvider, _START_REQUEST_, _END_REQUEST_) {
//    var $http,
//        interceptor = ['$q', '$injector', function ($q, $injector) {
//            var rootScope;

//            function success(response) {
//                // get $http via $injector because of circular dependency problem
//                $http = $http || $injector.get('$http');
//                // don't send notification until all requests are complete
//                if ($http.pendingRequests.length < 1) {
//                    // get $rootScope via $injector because of circular dependency problem
//                    rootScope = rootScope || $injector.get('$rootScope');
//                    // send a notification requests are complete
//                    rootScope.$broadcast(_END_REQUEST_);
//                }
//                return response;
//            }

//            function error(response) {
//                // get $http via $injector because of circular dependency problem
//                $http = $http || $injector.get('$http');
//                // don't send notification until all requests are complete
//                if ($http.pendingRequests.length < 1) {
//                    // get $rootScope via $injector because of circular dependency problem
//                    rootScope = rootScope || $injector.get('$rootScope');
//                    // send a notification requests are complete
//                    rootScope.$broadcast(_END_REQUEST_);
//                }
//                return $q.reject(response);
//            }

//            return function (promise) {
//                // get $rootScope via $injector because of circular dependency problem
//                rootScope = rootScope || $injector.get('$rootScope');
//                // send notification a request has started
//                rootScope.$broadcast(_START_REQUEST_);
//                return promise.then(success, error);
//            }
//        }];

//    $httpProvider.responseInterceptors.push(interceptor);
//}]);





angular.module('eSiroi.Web')
.config(['$httpProvider', function ($httpProvider) {
    var $http
         $httpProvider.interceptors.push(function ($q, $injector){
             //interceptor = ['$q', '$injector', function ($q, $injector) {
             var notificationChannel;

             function success(response) {
                 // get $http via $injector because of circular dependency problem
                 $http = $http || $injector.get('$http');
                 // don't send notification until all requests are complete
                 if ($http.pendingRequests.length < 1) {
                     
                     // get requestNotificationChannel via $injector because of circular dependency problem
                     notificationChannel = notificationChannel || $injector.get('requestNotificationChannel');
                     // send a notification requests are complete
                     notificationChannel.requestEnded();
                 }
                 return response;
             }

             function error(response) {
                 // get $http via $injector because of circular dependency problem
                 $http = $http || $injector.get('$http');
                 // don't send notification until all requests are complete
                 if ($http.pendingRequests.length < 1) {
                     // get requestNotificationChannel via $injector because of circular dependency problem
                     notificationChannel = notificationChannel || $injector.get('requestNotificationChannel');
                     // send a notification requests are complete
                     notificationChannel.requestEnded();
                 }
                 return $q.reject(response);
             }

             return function (promise) {
                 // get requestNotificationChannel via $injector because of circular dependency problem
                 notificationChannel = notificationChannel || $injector.get('requestNotificationChannel');
                 // send a notification requests are complete
                 notificationChannel.requestStarted();
                 return promise.then(success, error);
             }
         })
         console.log($httpProvider.interceptors);
        //}];

    //$httpProvider.responseInterceptors.push(interceptor);
         $httpProvider.interceptors.push('authInterceptorService');
}]);




//app.filter('startFrom', function () {
//    return function (input, start) {
//        start = +start; //parse to int
//        return input.slice(start);
//    }
//});

//app.controller('myController', ['$scope', 'YeastResource', function ($scope, YeastResource) {
//    $scope.yeasts = [];
//    $scope.currentPage = 0;
//    $scope.pageSize = 10;

//    $scope.numberOfPages = function () {
//        return Math.ceil($scope.yeasts.length / $scope.pageSize);
//    };

//    $scope.init = function () {
//        YeastResource.query({}, {sort: {Type: 1, Name: 1}}).then(function (yeast) {
//            $scope.yeasts = yeast;
//        });
//    };

//    $scope.init();
//}]);
