'use strict';
(function () {
    angular.module('eSiroi.Web')
    .factory('userService', ['$injector', function ($injector) {
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
        var userInAdmin=false;
        var userInDept = false;
        var userInPublic =false;
       
        function getUserRole(userName) {
            angular.forEach(usersInrole, function (user) {
                if (user.name === userName) { 
                    switch(user.role){
                        case 'SR':
                            userInAdmin=true;
                            break;
                        case 'Operator':
                            userInDept=true;
                            break;
                        case 'Public':
                            userInPublic = true;
                            break;
                    }     

                        return user.role
                }

            })
        }
        return {
            //set user profiles
            setUserProfile: function () {
                var authService = $injector.get('authService');
                currentUser.userName = authService.authentication.userName;
                currentUser.role = getUserRole(authService.authentication.userName);
               
            },
            //clear user profiles
            clearUserProfile: function(){
                currentUser = {};
                userInAdmin = false;
                userInDept = false;
                userInPublic = false;
            },
            userInAdmin: function () { return userInAdmin; },
            userInDept:function () { return userInDept; },
            userInPublic: function () { return userInPublic; }
      
           
                
        }

       
    }])
})();
