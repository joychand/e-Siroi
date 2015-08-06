'use strict';

// Home Controller
(function () {
    angular.module('eSiroi.Web')
    .controller('HomeController',['$scope', '$state', '$window','eSiroiWebSettings', HomeController])
    function HomeController($scope, $state, $window, eSiroiWebSettings) {
      
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
