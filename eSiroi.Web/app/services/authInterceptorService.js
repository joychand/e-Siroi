'use strict';
angular.module('eSiroi.Web')
.factory('authInterceptorService', ['$q', '$injector','$location', 'localStorageService', function ($q, $injector,$location, localStorageService) {

    var authInterceptorServiceFactory = {};

    var _request = function (config) {

        config.headers = config.headers || {};
       
        var authData = localStorageService.get('authorizationData');
        if (authData) {
            config.headers.Authorization = 'Bearer ' + authData.token;
        }

        return config;
    }

    var _responseError = function (rejection) {
        var loggedin = false;
        var authService = $injector.get('authService');
        var state = $injector.get('$state');
        var authData = localStorageService.get('authorizationData');
        if (authData)
        {
            loggedin = true;
        }
        if (rejection.status === 401 && !loggedin) {
           
            authService.logOut();
           
            state.go('department.content.login');
        }
        return $q.reject(rejection);
    }

    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;

    return authInterceptorServiceFactory;
}]);