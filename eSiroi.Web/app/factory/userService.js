'use strict';
(function () {
    angular.module('eSiroi.Web')
    .factory('userService', ['$injector','$http', function ($injector,$http) {
       
        var userfactory = {
            currentUser: {
                userName: {},
                role: []
            },
                
   
       
        
        userInSR:false,
        userInDept:false,
        userInPublic: false,
        userInAdmin:false,
        
            //set user profiles
            fillUserClaim: function (roles) {
                var authService = $injector.get('authService');
                this.currentUser.userName = authService.authentication.userName;
               
                this.currentUser.role = roles;
                angular.forEach(this.currentUser.role, function (role) {
                   
                    switch (role) {
                        case 'SR': {
                            userfactory.userInSR = true;
                            break;
                        }
                        case 'Operator': {
                            userfactory.userInDept = true;
                            break;
                        }
                        case 'public': {
                            
                            userfactory.userInPublic = true;
                            break;
                            }
                        case 'Admin': {
                            userfactory.userInAdmin = true;
                        }
                    }
                })
               
            },
            //clear user profiles
            clearUserProfile: function(){
                this.currentUser = {};
                this.userInSR=false;
                this.userInDept=false;
                this.userInPublic=false;
                this.userInAdmin = false;
            },
          
        }

        return userfactory

        function getUserRole(userName) {
            //TO DO *****  DATA SHOULD BE FILLED FROM AUTHENTICATION SERVER******
            $http.post('http://localhost/eSiroi.Authentication/api/accounts/getUserRoles','"'+ userName +'"' ).then(function (result) {
                console.log(result.data);
                return result.data;
            })
            //var usersInrole = [
           //{
           //    name: 'kaibem',
           //    role: ['SR']
           //},
           //{
           //    name: 'tombi',
           //    role: ['Operator']
           //},
           //{
           //    name: 'chibem',
           //    role: ['Public']
           //}
           // ];
           
           // for(var i=0;usersInrole.length>i;i++){
           //     if (usersInrole[i].name === userName) {
                    
           //         return usersInrole[i].role;
           //     }
               
           // }
           
                

            
        }
    }])
})();
