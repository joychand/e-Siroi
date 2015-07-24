'use strict';
app.controller('indexController', ['$scope', '$location', 'authService', function ($scope, $location, authService) {

    $scope.logOut = function () {
        //$location.path('/home');
        authService.logOut();
        $location.path('/home');
    }

    $scope.authentication = authService.authentication;

}]);