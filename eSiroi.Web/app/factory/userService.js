'use strict';
(function () {
    angular.module('eSiroi.Web')
    .factory('userService', ['$injector', function ($injector) {
       
        var userfactory = {
            currentUser: {
                userName: {},
                role: []
            },
                
   
       
        
        //userInAdmin:false,
        //userInDept:false,
        //userInPublic :false,        
        
            //set user profiles
            fillUserClaim: function () {
                var authService = $injector.get('authService');
                this.currentUser.userName = authService.authentication.userName;
                this.currentUser.role = getUserRole(authService.authentication.userName);
                console.log(this.currentUser.role);
               
            },
            //clear user profiles
            clearUserProfile: function(){
                this.currentUser = {};
                this.userInAdmin = false;
                this.userInDept = false;
                this.userInPublic = false;
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
