'use strict';
(function () {
    angular.module('eSiroi.Web')
    .factory('userService', ['$injector', function ($injector) {
       
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
            fillUserClaim: function () {
                var authService = $injector.get('authService');
                this.currentUser.userName = authService.authentication.userName;
                this.currentUser.role = getUserRole(authService.authentication.userName);
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
                        case 'Public': {
                            
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
            var usersInrole = [
           {
               name: 'kaibem',
               role: ['SR']
           },
           {
               name: 'tombi',
               role: ['Operator']
           },
           {
               name: 'chibem',
               role: ['Public']
           }
            ];
           
            for(var i=0;usersInrole.length>i;i++){
                if (usersInrole[i].name === userName) {
                    
                    return usersInrole[i].role;
                }
               
            }
           
                

            
        }
    }])
})();
