//angular.module('eSiroi.Web')
//    .factory('requestNotificationChannel', ['$rootScope', function ($rootScope) {
//    // private notification messages
//    var _START_REQUEST_ = '_START_REQUEST_';
//    var _END_REQUEST_ = '_END_REQUEST_';

//    // publish start request notification
//    var requestStarted = function () {
//        $rootScope.$broadcast(_START_REQUEST_);
//        console.log('spinner started');
//    };
//    // publish end request notification
//    var requestEnded = function () {
//        $rootScope.$broadcast(_END_REQUEST_);
//        console.log('spinner ended');
//    };
//    // subscribe to start request notification
//    var onRequestStarted = function ($scope, handler) {
//        $scope.$on(_START_REQUEST_, function (event) {
//            handler();
//        });
//    };
//    // subscribe to end request notification
//    var onRequestEnded = function ($scope, handler) {
//        $scope.$on(_END_REQUEST_, function (event) {
//            handler();
//        });
//    };

//    return {
//        requestStarted: requestStarted,
//        requestEnded: requestEnded,
//        onRequestStarted: onRequestStarted,
//        onRequestEnded: onRequestEnded
//    };
//}]);


angular.module('eSiroi.Web').factory('httpLoaderInterceptor', ['$rootScope', function ($rootScope) {
    // Active request count
    var requestCount = 0;

    function startRequest(config) {
        // If no request ongoing, then broadcast start event
        if (!requestCount) {
            $rootScope.$broadcast('httpLoaderStart');
        }

        requestCount++;
        return config;
    }

    function endRequest(arg) {
        // No request ongoing, so make sure we don’t go to negative count
        if (!requestCount)
            return;

        requestCount--;
        // If it was last ongoing request, broadcast event
        if (!requestCount) {
            $rootScope.$broadcast('httpLoaderEnd');
        }

        return arg;
    }

    // Return interceptor configuration object
    return {
        'request': startRequest,
        'requestError': endRequest,
        'response': endRequest,
        'responseError': endRequest
    };
}]);