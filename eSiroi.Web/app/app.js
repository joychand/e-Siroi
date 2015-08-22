/// <reference path = ~/scripts/angular.js />
/// <reference path = ~/scripts/app/factory/datafactory.js>

/// <reference path = ~/scripts/angular-ui-router.js>
/// <reference path = ~/scripts/app/factory/sessionFactory.js>

var app = angular.module('eSiroi.Web', ['ui.router', 'ct.ui.router.extras', 'angularModalService', 'ui.bootstrap', 'ngGrid', 'ngSanitize', 'ui.mask', 'errorHandler', 'smart-table', 'LocalStorageModule']);

app.config(['$stateProvider', "$locationProvider", '$urlRouterProvider','$provide',function ($stateProvider, $locationProvider,$urlRouterProvider,$provide ) {
    var baseUrl = $("base").first().attr("href");
   
    $urlRouterProvider.otherwise('/home');
    //#region MAINNAVIGATIONROUTING
    //********************** NAVIGATION TOP BAR ROUTING ******************************//
    $stateProvider
       
       
        .state('Home', {
            url: "/home",
            templateUrl: 'Home/home_page',
            controller: "HomeController"
        })
        
         .state('login', {
             url: "/login",
             templateUrl: baseUrl + '/Home/login_page'
             //controller: "simpleController"
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
            controller: 'deptloginController'
   
        })

        .state('department.content.home', {
            url: '/home',
            templateUrl: baseUrl +'/Home/dept_home',
            controller: 'deptHomeController',
            
            resolve: {
                applications: function (dept_dataFactory) {
                    var status = 'Approved';
                   return dept_dataFactory.getDeed(status)
                }
            }
        })
       
        .state('Search', {
            url: '/Search',
            templateUrl: baseUrl + '/Home/searchReg'
           
        })
        .state('department.content.onlineapplication', {
            url: '/onlineapplication',
            templateUrl: baseUrl + '/Home/dept_OnlineApplication',
            controller: 'dept_OnlineController',
            data: {
                status: 'Applied'
            }
        })
        .state('department.content.data', {
            url: '/dataEntry',
            templateUrl: baseUrl + '/Home/dept_dataEntry',
            controller: 'dept_regController',
            resolve: {
                majortrans: function (dataFactory) {
                    return dataFactory.getMajortransaction().then(function (results) {
                        
                        return results;});
                }
            }
        })

        .state('department.content.form', {
            
            url: '/dataEntryform',
            templateUrl: baseUrl + 'Home/dept_dataEntry_form',
            controller: 'dataEntryformController',
            
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
            district: function (dataFactory) {
                return dataFactory.getDistricts();

            }
            }
        })

        .state('department.content.form.executant', {
            url: '/dataEntryformexecutant',
            templateUrl: baseUrl + 'Home/dept_dataEntry_form_executant',
            controller: 'deptExeController',
            resolve: {
                online: function (dept_sessionfactory) {
                    return dept_sessionfactory.getOnline();
                }
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
        .state('department.content.dataentered', {
            url: '/dataEntered',
            templateUrl: baseUrl + 'Department/deptDataEntered',
            controller: 'dataEntCompController'
        })
        .state('department.content.upload', {
            url: '/upload',
            templateUrl: baseUrl + 'Home/dept_scanDocuments'
        })
        .state('department.content.uploadComplete', {
            url: '/uploadcomplete',
            templateUrl: baseUrl + 'Home/upload_complete'
        })
        //#endregion 
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
                    displayName: 'ApplyHome'
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

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }



    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    // extra
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
});
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
        console.log('statechangestart');
       
        if (toState.name !== 'department.content.login' ) return;
        
                var modalOptions = {
                    closeButtonText: 'Cancel',
                    actionButtonText: 'Login',
                    headerText: 'Login',
                    bodyText: ''
                };

                var modalDefault = {
                    templateUrl: eSiroiWebSettings.baseUrl + '/Home/loginPage',
                    controller: 'loginModalCtrl',
                    backdrop: 'static',
                    size: 'lg'
                   
                };

        modalService.showModal(modalDefault, modalOptions).then(function (result) {
                       // $state.go('department.content.home');            
                         }, function (error) {
                       // $state.go($rootScope.previousState);
                    });
        event.preventDefault();  
    })

       
   
    $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
                $rootScope.previousState = from.name;
                $rootScope.currentState = to.name;
                console.log('Previous state:' + $rootScope.previousState)
                console.log('Current state:' + $rootScope.currentState)
    });

    

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