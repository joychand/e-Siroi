'use strict';

angular.module('eSiroi.Web').factory('httpLoaderInterceptor', ['$rootScope','$q', function ($rootScope,$q) {
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

    function error(arg) {
        
            if (requestCount) {
                  requestCount--;
                    }
             $rootScope.$broadcast('httpLoaderEnd');
            return $q.reject(arg);
        
    }
    // Return interceptor configuration object
    return {
        'request': startRequest,
        'requestError': error,
        'response': endRequest,
        'responseError': error
    };
}]);