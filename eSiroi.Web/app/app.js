
var app = angular.module('eSiroi.Web', ['ui.router', 'ct.ui.router.extras', 'angularModalService', 'ui.bootstrap', 'ngGrid', 'ngSanitize', 'ui.mask', 'errorHandler', 'smart-table', 'LocalStorageModule', 'gm.datepickerMultiSelect']);

app.config(['$stateProvider', "$locationProvider", '$urlRouterProvider','$provide',function ($stateProvider, $locationProvider,$urlRouterProvider,$provide ) {
    var baseUrl = $("base").first().attr("href");
   
    $urlRouterProvider.otherwise('/home');
    //#region MAINNAVIGATIONROUTING
    //********************** NAVIGATION TOP BAR ROUTING ******************************//
    $stateProvider
       

       .state('Index', {
           url: "/",
           templateUrl: 'Home/Index',
           controller: "indexController",
           data: {
               loginRequired: false,
               roles: []
           }
       })
         .state('NoAuth', {
             url: "/",
             template: '<h1>YOU ARE NOT AUTHORIZED </h1>',
             
             data: {
                 loginRequired: false,
                 roles: []
             }
         })
        .state('Home', {
            url: "/home",
            templateUrl: 'Home/home_page',
            controller: "HomeController",
            data: {
                loginRequired: false,
                roles: []
            }
        })
        
         .state('login', {
             url: "/login",
             templateUrl: baseUrl + 'Home/loginPage',
             controller: "loginModalCtrl"
         })
//#endregion MAINNAVIGATIONROUTING
        //#region DEPARTMENTROUTING
       
         
         .state('department', {
             url: "/department",
             templateUrl: baseUrl + 'Home/department',
             controller: 'departmentController'
            
         })

        .state('department.content',{
                abstract: true,
                controller: 'deptcontentController',
                views: {
                        'sidemenu@department': {
                            templateUrl: baseUrl + 'Home/deptsidemenu',
                            controller: 'deptmenuController'
                        },
                       '@department':{
                            templateUrl: baseUrl + 'Home/departmentcontent'
                            }
                        }
        })

        .state('department.content.login',
        {
            url: '/login',
            templateUrl: baseUrl + 'Home/login_page',
            data: {
                loginRequired: false,
                roles: []
            }
   
        })

        .state('department.content.home', {
            url: '/home',
            templateUrl: baseUrl +'Home/dept_home',
            controller: 'deptHomeController',
            data: {
                loginRequired: true,
                roles: ['SR', 'Operator']
            }
            
            //resolve: {
            //    applications: function (dept_dataFactory) {
            //        var status = 'Approved';
            //       return dept_dataFactory.getDeed(status)
            //    }
            //}
        })
       
        .state('Search', {
            url: '/Search',
            templateUrl: baseUrl + 'Home/searchReg'
           
        })
        .state('department.content.onlineapplication', {
            url: '/onlineapplication',
            templateUrl: baseUrl + 'Home/dept_OnlineApplication',
            controller: 'dept_OnlineController',
            data: {
                status: 'Applied',
                loginRequired: true,
                roles: ['Operator']
            }
        })
        //#region UPDATE
           .state('department.content.enterdeed', {
               url: '/onlineDeedEntry',
               templateUrl: baseUrl + 'Department/online_deed',
               controller: 'dept_OnlineDeedController',
               data: {
                   loginRequired: true,
                   roles: ['Operator']
               } 
       
    
           })
        .state('department.content.updateform', {
            url: '/updateForm',
            templateUrl: baseUrl + 'Department/online_update',
            controller: 'updateController',
            data: {
                loginRequired: true,
                roles: ['Operator']
            }


        })
        .state('department.content.updateform.deed', {
            url: '/updateDeed',
            templateUrl: baseUrl + 'Department/online_deed_update',
            controller: 'upDeedController',
            data: {
                loginRequired: true,
                roles: ['Operator']
            }


        })
        .state('department.content.updateform.property', {
            url: '/updateProperty',
            templateUrl: baseUrl + 'Department/online_property_update',
            controller: 'upPropertyController',
            data: {
                loginRequired: true,
                roles: ['Operator']
            }


        })
        .state('department.content.updateform.executant', {
            url: '/updateExecutant',
            templateUrl: baseUrl + 'Department/online_executant_update',
            controller: 'upExecController',
            data: {
                loginRequired: true,
                roles: ['Operator']
            }


        })
        .state('department.content.updateform.claimant', {
            url: '/updateclaimant',
            templateUrl: baseUrl + 'Department/online_claimant_update',
            controller: 'upClaimController',
            data: {
                loginRequired: true,
                roles: ['Operator']
            }


        })
        .state('department.content.updateform.identifier', {
            url: '/updateidentifier',
            templateUrl: baseUrl + 'Department/online_identifier_update',
            controller: 'upIdentController',
            data: {
                loginRequired: true,
                roles: ['Operator']
            }


        })
        //#endregion UPDATE

        //#region OFFLINE DATAENTRY
        .state('department.content.data', {
            url: '/dataEntry',
            templateUrl: baseUrl + '/Home/dept_dataEntry',
            controller: 'dept_regController',
            data:{
               
                loginRequired: true,
                roles: ['Operator']
            },
            resolve: {
                majortrans: ['dataFactory', function (dataFactory) {
                    return dataFactory.getMajortransaction().then(function (results) {
                        
                        return results;});
                }]
            }
        })
        //#endregion OFFLINE
        //#region FORM ENTRY
        .state('department.content.form', {
            
            url: '/dataEntryform',
            templateUrl: baseUrl + 'Home/dept_dataEntry_form',
            controller: 'dataEntryformController',
            resolve: {
                transID: ['dept_dataFactory', 'dept_sessionfactory',function (dept_dataFactory, dept_sessionfactory) {
                    return dept_dataFactory.generateTsID(dept_sessionfactory.user.sro).then(function (results) {

                        return results.data;
                    });
                }]
            }
            
        })
           .state('department.content.form.deed', {
               url: '/dataEntryformDeed',
               templateUrl: baseUrl + 'Home/dept_dataEntry_form_deed',
               controller: 'deptDeedController'
           })
        .state('department.content.form.property', {
            url: '/dataEntryformProperty',
            templateUrl: baseUrl + 'Home/dept_dataEntry_form_property',
            controller: 'deptPropController',
            resolve:{
                district: ['dataFactory', function (dataFactory) {
                return dataFactory.getDistricts();

            }]
            }
        })

        .state('department.content.form.executant', {
            url: '/dataEntryformexecutant',
            templateUrl: baseUrl + 'Home/dept_dataEntry_form_executant',
            controller: 'deptExeController',
            resolve: {
                online: ['dept_sessionfactory',function (dept_sessionfactory) {
                    return dept_sessionfactory.getOnline();
                }]
            }
        })

         .state('department.content.form.claimant', {
             url: '/dataEntryformclaimant',
             templateUrl: baseUrl + 'Home/dept_dataEntry_form_claimant',
             controller: 'deptClaimController'
         })

        .state('department.content.form.identifier', {
            url: '/dataEntryformidentifier',
            templateUrl: baseUrl + 'Home/dept_dataEntry_form_identifier',
            controller: 'deptIdentController'
        })

        //#endregion FORM ENTRY
        .state('department.content.dataentered', {
            url: '/dataEntered',
            templateUrl: baseUrl + 'Department/deptDataEntered',
            controller: 'dataEntCompController'
        })
        .state('department.content.printFsheet',
        {
            url: '/printFsheet',
            templateUrl: baseUrl + 'Department/Fsheet',
            controller: 'fsheetModalController'

        })
    
        .state('department.content.upload', {
            url: '/upload',
            templateUrl: baseUrl + 'Home/dept_scanDocuments',
            controller: 'uploadController'
        })
        .state('department.content.uploadComplete', {
            url: '/uploadcomplete',
            templateUrl: baseUrl + 'Home/upload_complete'
        })
         .state('department.content.finalupload', {
             url: '/finalupload',
             templateUrl: baseUrl + 'Department/FinalUpload',
             controller: 'finaluploadController',
             data: {
                 loginRequired: true,
                 roles: ['Operator']
             }
         })
        //#endregion 
        //#region REPORT ROUTING
         .state('report', {
             url: '/certificate',
             templateUrl: baseUrl + 'Department/Certificate',
             controller:'certyController',
             data: {
                 loginRequired: true,
                 roles: ['Operator']
             }
         })
        //#endregion REPORTROUTING
        //#region PUBLICROUTING
       

         .state('registration', {
             abstract:true,
             url: "/registration",
             templateUrl: baseUrl + 'Home/registration',
             deepStateRedirect: true,
             data:{
                 breadcrumbProxy:'registration.content.apply'
             }
            
         })

        .state('registration.content',
        {
            abstract: true,
            controller: 'simpleController',
            views: {
                'sidemenu@registration': {
                    templateUrl: baseUrl + 'Home/regsidemenu'
                },
                '@registration':{
                    templateUrl: baseUrl + 'Home/registrationcontent',
                   
                    }
            },
            deepStateRedirect: true,
            data: {
                breadcrumbProxy: 'registration.content.apply'
            }
           
        })
        .state('registration.content.apply', {
            url:'/apply',
            templateUrl: baseUrl + 'Home/applyregistration',
            controller: 'applyRegistrationController',
            data: {
                displayName: 'Apply',
                loginRequired: false,
                roles: []
                  }
                       
        })
        .state('registration.content.apply.login', {
            url: '/login',         
            templateUrl: baseUrl + "Home/applyRegLogin"
        })
        
        .state('registration.content.forms', {
            abstract:true,
            url: '/forms',
            templateUrl: baseUrl + 'Home/registrationforms',
            controller:'registrationController',
            deepStateRedirect: true,
            data: {
                breadcrumbProxy: 'registration.content.apply'
            }
        })
        .state('registration.content.forms.propertydetails', {
            url: '/propertydetails',
            templateUrl: baseUrl + 'Home/applyPropertyDetails',
            data: {
                displayName: 'Property'
            }
            //controller: 'propertyController'
        })
        .state('registration.content.forms.executant', {
            url: '/executant',
            //template: '<h1>executant<h1>'
            templateUrl: baseUrl + 'Home/executant',
            //controller: 'registrationController',
           // resolve
            deepStateRedirect: true,
            data: {
                displayName: 'Executant'
            }

        })
        .state('registration.content.forms.claimant', {
            url: '/claimant',
            templateUrl: baseUrl + "Home/claimant",
            deepStateRedirect: true,
            data: {
                displayName: 'Claimant'
            }
        })
        .state('registration.content.forms.identifier', {
            url:'/identifier',
            templateUrl: baseUrl + "Home/identifier",
            deepStateRedirect: true,
            data: {
                displayName: 'Identifier'
            }
        })
       .state('registration.content.applyregsuccess', {
           url: '/success',
           controller:'ApplySuccessController',
           templateUrl: baseUrl + "Home/ApplyRegSuccess",
           deepStateRedirect: true,
           data: {
               displayName: 'ApplyComplete'
           }
       })
       .state('registration.content.publicHome', {
           url: '/publicHome',
           controller: 'publicHomeCtrl',
           templateUrl: baseUrl + "Public/PublicHome",
           //: true,
           data: {
               displayName: 'Home',
               loginRequired: true,
               roles: ['public']
           }
       })
    //#endregion PUBLICROUTING   

    
  
}]);

var AuthServiceBase = 'http://localhost/eSiroi.Authentication/';
var ResrcServiceBase = 'http://localhost/eSiroi.Resource/';

app.constant('eSiroiWebSettings', {
    apiAuthServiceBaseUri: AuthServiceBase,
    apiResrcServiceBaseUri:ResrcServiceBase,
    clientId: 'eSiroi.Web',
    baseUrl : $("base").first().attr("href")
});

app.config(['$httpProvider',function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
    $httpProvider.interceptors.push('httpLoaderInterceptor');
    console.log($httpProvider.interceptors);
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }



    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    // extra
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
}]);
//*********** GLOBAL RUN CONFIG EVENTS *************************//
app.run(['$rootScope', '$state', '$window', '$timeout', '$stateParams','errorHandler','authService','modalService','eSiroiWebSettings',

function ($rootScope, $state, $window, $timeout, $stateParams, errorHandler, authService, modalService,eSiroiWebSettings) {
    $rootScope.$state = $state;
    $rootScope.previouState;
    $rootScope.currentState;
    $rootScope.errorHandler = errorHandler;
    $rootScope.$stateParams = $stateParams;
    
        authService.fillAuthData();
        $rootScope.authentication = authService.authentication;

   
       
   
   
    $rootScope.signOut=function(){
       
                   
            authService.logOut();
            $state.go('Home');
       
    }


    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        console.log(toState.name);
        if (toState.name !== 'login' && toState.name !== 'Home') {
            var loggedin = toState.data.loginRequired || false;
            var roles = toState.data.roles || [];
            if (loggedin) {
                if (!authService.authentication.isAuth) {
                    event.preventDefault();
                    //$urlRouter.sync();
                    $state.go('login');
                   
                }
                else {
                    if (roles.length > 0) {
                       
                        if (authService.authentication.roles.length === 0) {
                            event.preventDefault();
                            return $state.go('login');
                        }
                        for (var i = 0; i < authService.authentication.roles.length; i++) {
                            if (roles.indexOf(authService.authentication.roles[i]) > -1) {
                                return;
                            }
                        }
                        event.preventDefault();
                        return $state.go('NoAuth');
                    }
                  
                   
                }

            }
            //return;
            //event.preventDefault();
        }

        else if (toState.name === 'Home') return;
       
         
    })

    
   
    $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
                $rootScope.previousState = from.name;
                $rootScope.currentState = to.name;
                console.log('Previous state:' + $rootScope.previousState)
                console.log('Current state:' + $rootScope.currentState)
    });

   

    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
        console.log(error);
    })

    }]);





app.controller('propertyController', ['$scope', '$state','dataFactory', function ($scope, $state, dataFactory) {

    $scope.districts = {}
    $scope.circles = {}
    $scope.RevVillages = {}

    init();

    function init() {
        getDistricts()
        getCircles()
        getRevVillages()

    }

    function getDistricts() {
        dataFactory.getDistricts().then(function (districts) {
            $scope.districts = districts;
        });
    }

    function getCircles() {
        dataFactory.getCircle().then(function (Circles) {
            $scope.Circles = Circles;
        });
    }

    function getRevVillages() {
        dataFactory.getRevVillage().then(function (RevVillages) {
            $scope.RevVillages = RevVillages;
        });
    }

    $scope.nextparty = function () {
        $scope.state = $state;
        $state.go('registration.content.forms.executant');
    }
    //$scope.showvillage = function (village) {
    //   return village === 
    //}
}]);