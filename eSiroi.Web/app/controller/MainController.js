'use strict';

// Home Controller
(function () {
    angular.module('eRegApp')
    .controller('HomeController',['$scope', '$state', '$window', HomeController])
    function HomeController($scope, $state, $window) {
        //window.onbeforeunload = function (event) {
        //    var message = 'All data will be lost?';
        //    if (typeof event == 'undefined') {
        //        event = window.event;
        //    }
        //    if (event) {
        //        event.returnValue = message;
        //    }
        //    return message;
        //}
        $scope.myInterval = 5000;
        var slides = $scope.slides = [];
        
        slides.push(
            {
            image: '../../images/loktak.jpg',
            text: 'loktak'
        },
        {
            image: '../../images/manHouse2.png',
            text: 'House'

        },
        {
            image: '../../images/manHouse.jpg',
            text: 'House2'
        }
         );

    }
})();
