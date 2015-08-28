'use strict';

// Home Controller
(function () {
    angular.module('eSiroi.Web')
    .controller('HomeController',['$scope', '$state', '$window','eSiroiWebSettings','authService', HomeController])
    function HomeController($scope, $state, $window, eSiroiWebSettings, authService) {
      
        var currentUser = {};
        //TO DO *****  DATA SHOULD BE FILLED FROM AUTHENTICATION SERVER******
        var usersInrole = [
            {
                name: 'kaibem',
                role: 'SR'
            },
            {
                name: 'tombi',
                role: 'Operator'
            },
            {
                name: 'chibem',
                role: 'public'
            }
        ]
        var userInAdmin = false;
        var userInDept = false;
        var userInPublic = false;
        getUserRole('tombi');
        function getUserRole(userName) {
            angular.forEach(usersInrole, function (user) {
                if (user.name === userName) {
                    switch (user.role) {
                        case 'SR':
                            userInAdmin = true;
                            break;
                        case 'Operator':
                            userInDept = true;
                            break;
                        case 'Public':
                            userInPublic = true;
                            break;
                    }

                    console.log(userInDept);
                    console.log(userInAdmin);
                    console.log(userInPublic);
                }

            })
        }
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