





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




