'use strict';

// Home Controller
(function () {
    angular.module('eSiroi.Web')
    .controller('HomeController',['$scope', '$state', '$window','eSiroiWebSettings','authService', HomeController])
    function HomeController($scope, $state, $window, eSiroiWebSettings, authService) {
      
       
        $scope.myInterval = 5000;
        var slides = $scope.slides = [];
        
        slides.push(
            {
                image: eSiroiWebSettings.baseUrl + '/images/loktak.jpg',
            text: 'loktak'
        },
        {
            image: eSiroiWebSettings.baseUrl + '/images/manHouse2.png',
            text: 'House'

        },
        {
            image: eSiroiWebSettings.baseUrl + '/images/manHouse.jpg',
            text: 'House2'
        }
         );
        

    }
})();

(function () {
    angular.module('eSiroi.Web')
    .controller('indexController', ['$scope', 'authService', function ($scope, authService) {
        //$scope.authentication = authService.authentication;
        //console.log('index' + $scope.authentication.isAuth);
    }])
})();