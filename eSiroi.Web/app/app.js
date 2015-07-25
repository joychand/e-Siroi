/// <reference path = ~/scripts/angular.js />
/// <reference path = ~/scripts/app/factory/datafactory.js>

/// <reference path = ~/scripts/angular-ui-router.js>
/// <reference path = ~/scripts/app/factory/sessionFactory.js>

var app = angular.module('eSiroi.Web', ['ui.router', 'ct.ui.router.extras', 'angularModalService', 'ui.bootstrap', 'ngGrid', 'ngSanitize', 'ui.mask', 'errorHandler', 'smart-table']);
//var app1 = angular.module('eRegDeptApp', ['ngroute']);
//app.value = ('maj_code', '');
app.config(['$stateProvider', "$locationProvider", '$urlRouterProvider','$provide',function ($stateProvider, $locationProvider,$urlRouterProvider,$provide ) {
   
   
    $urlRouterProvider.otherwise('/home');

    //********************** NAVIGATION TOP BAR ROUTING ******************************//
    $stateProvider
        .state('Home', {
            url: "/home",
            templateUrl: '/Home/home_page',
            controller: "HomeController"
        })
         .state('login', {
             url: "/login",
             templateUrl: '/Home/login_page'
             //controller: "simpleController"
         })

        //***************DEPARTMENT ROUTING********************//

         .state('department', {
             url: "/department",
             templateUrl: '/Home/department',
             controller: 'departmentController'
         })

    .state('department.content',{
        abstract: true,
        controller: 'deptcontentController',
        views: {
            'sidemenu@department': {
                templateUrl: 'Home/deptsidemenu',
                controller: 'deptmenuController'
            },
            '@department':{
                    templateUrl: '/Home/departmentcontent'
            }
        }
    })

        .state('department.content.login',
        {
            url: '/login',
            templateUrl: '/Home/login_page',
            controller: 'deptloginController',
            resolve:{
                modalService: 'modalService',
                $state: '$state'
            },
            onEnter: function (modalService,$state,$rootScope) {
                var modalOptions = {
                    closeButtonText: 'Cancel',
                    actionButtonText: 'Login',
                    headerText: 'Login',
                    bodyText: ''
                };

                var modalDefault = {
                    templateUrl: '/Home/loginPage',
                    controller: 'loginModalCtrl',
                    backdrop: 'static',
                    size: 'lg'
                   
                };

                modalService.showModal(modalDefault, modalOptions).then(function (result) {

                    $state.go('department.content.home');
                    
                    
                }, function (error) {
                    $state.go($rootScope.previousState);
                });
    }
        })

        .state('department.content.home', {
            url: '/home',
            templateUrl: '/Home/dept_home',
            controller: 'deptHomeController',
            data: {
                status: 'Applied'
            }
        })
       
        .state('Search', {
            url: '/Search',
            templateUrl: '/Home/searchReg'
           
        })
        .state('department.content.onlineapplication', {
            url: '/onlineapplication',
            templateUrl:'/Home/dept_OnlineApplication',
            controller: 'dept_OnlineController',
            data: {
                status: 'Applied'
            }
        })
        .state('department.content.data', {
            url: '/dataEntry',
            templateUrl: '/Home/dept_dataEntry',
            controller: 'dept_regController',
            resolve: {
                majortrans: function (dataFactory) {
                    return dataFactory.getMajortransaction().then(function (results) {
                        //var time = results.config.responseTimestamp - results.config.requestTimestamp;
                        //console.log('The request took ' + (time / 1000) + ' seconds.');
                        return results;});
                }
            }
        })

        .state('department.content.form', {
            
            url: '/dataEntryform',
            templateUrl: '/Home/dept_dataEntry_form',
            controller: 'dataEntryformController',
            
        })
           .state('department.content.form.deed', {
               url: '/dataEntryformDeed',
               templateUrl: 'Home/dept_dataEntry_form_deed',
               controller: 'deptDeedController'
           })
        .state('department.content.form.property', {
            url: '/dataEntryformProperty',
            templateUrl: 'Home/dept_dataEntry_form_property',
            controller: 'deptPropController',
            resolve:{
            district: function (dataFactory) {
                return dataFactory.getDistricts();

            }
            }
        })

        .state('department.content.form.executant', {
            url: '/dataEntryformexecutant',
            templateUrl: 'Home/dept_dataEntry_form_executant',
            controller: 'deptExeController',
            resolve: {
                online: function (dept_sessionfactory) {
                    return dept_sessionfactory.getOnline();
                }
            }
        })

         .state('department.content.form.claimant', {
             url: '/dataEntryformclaimant',
             templateUrl: 'Home/dept_dataEntry_form_claimant',
             controller: 'deptClaimController'
         })

        .state('department.content.form.identifier', {
            url: '/dataEntryformidentifier',
            templateUrl: 'Home/dept_dataEntry_form_identifier',
            controller: 'deptIdentController'
        })
        .state('department.content.dataentered', {
            url: '/dataEntered',
            templateUrl: 'Home/dept_dataEntered'
        })
        .state('department.content.upload', {
            url: '/upload',
            templateUrl: 'Home/dept_scanDocuments'
        })
        .state('department.content.uploadComplete', {
            url: '/uploadcomplete',
            templateUrl: 'Home/upload_complete'
        })
        // *************APPLY REGISTRATION ROUTING*****************//

         .state('registration', {
             abstract:true,
             url: "/registration",
             templateUrl: 'Home/registration',
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
                    templateUrl: 'Home/regsidemenu'
                },
                '@registration':{
                    templateUrl: 'Home/registrationcontent',
                   

                    }

            },
            deepStateRedirect: true,
            data: {
                breadcrumbProxy: 'registration.content.apply'
            }
            
             
        })
        .state('registration.content.apply', {
            url:'/apply',
            templateUrl: 'Home/applyregistration',
           controller: 'applyRegistrationController',
            //views: {

            //    '@registration.content': {
            //        templateUrl: 'Home/applyregistration',
            //        controller: 'applyRegistrationController'

            //    },
                data: {
                    displayName: 'ApplyHome'
                }
           
            //deepStateRedirect: true
            
        })
        .state('registration.content.apply.login', {
            url: '/login',
            
               
                    templateUrl: "Home/applyRegLogin"
                
            
        })
        
        .state('registration.content.forms', {
            abstract:true,
            url: '/forms',
            templateUrl: 'Home/registrationforms',
            controller:'registrationController',
            deepStateRedirect: true,
            data: {
                breadcrumbProxy: 'registration.content.apply'
            }
        })
        .state('registration.content.forms.propertydetails', {
            url: '/propertydetails',
            templateUrl: 'Home/applyPropertyDetails',
            data: {
                displayName: 'Property'
            }
            //controller: 'propertyController'
        })
        .state('registration.content.forms.executant', {
            url: '/executant',
            //template: '<h1>executant<h1>'
            templateUrl: 'Home/executant',
            //controller: 'registrationController',
           // resolve
            deepStateRedirect: true,
            data: {
                displayName: 'Executant'
            }

        })
        .state('registration.content.forms.claimant', {
            url: '/claimant',
            templateUrl: "Home/claimant",
            deepStateRedirect: true,
            data: {
                displayName: 'Claimant'
            }
        })
        .state('registration.content.forms.identifier', {
            url:'/identifier',
            templateUrl: "Home/identifier",
            deepStateRedirect: true,
            data: {
                displayName: 'Identifier'
            }
        })
       .state('registration.content.applyregsuccess', {
           url: '/success',
           controller:'ApplySuccessController',
           templateUrl: "Home/ApplyRegSuccess",
           deepStateRedirect: true,
           data: {
               displayName: 'ApplyComplete'
           }
       })
         
    //$locationProvider.html5Mode(true).hashPrefix("!");
    //app.run(function ($rootScope, $state, $window, $timeout, $stateParams) {
    //    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    //        console.log('hahahahah');
    //        if (toState.resolve) {
    //            $rootScope.page.loading = true;
    //        }
    //    });

    //    $rootScope.addError = function (error) {
    //        $rootScope.message = error.message;
    //        $rootScope.reason = error.reason;
    //        $rootScope.page.loading = true;
    //        //$rootScope.values = 'jhgkjhkj';
    //    }
    //    $rootScope.$state = $state;
    //    $rootScope.previouState;
    //    $rootScope.currentState;
    //    $rootScope.$stateParams = $stateParams;
    //    $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
    //        $rootScope.previousState = from.name;
    //        $rootScope.currentState = to.name;
    //        console.log('Previous state:' + $rootScope.previousState)
    //        console.log('Current state:' + $rootScope.currentState)
    //    });
    //    //$rootScope.$on("$stateChangeSuccess", function (ev, to, toParams, from, fromParams) {
    //    //    console.log('success');
    //    //    $rootScope.previousState = from.name;
    //    //    $rootScope.currentState = to.name;
    //    //    console.log('Previous state:' + $rootScope.previousState)
    //    //    console.log('Current state:' + $rootScope.currentState)
    //    //    if (toState.resolve) {
    //    //        $rootScope.page.loading = false;
    //    //    }
    //    //    $timeout(function () {
    //    //        $window.ga('send', 'pageview', $window.location.pathname + $window.location.hash);
    //    //    });
    //    //});

    //    //$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    //    //    console.log('hahahahah');
    //    //    if (toState.resolve) {
    //    //        $rootScope.page.loading = true;
    //    //    }
    //    //});
    //});
    

    //$rootScope.$on("$routeChangeStart", function (event, next, current) {
    //    if (sessionStorage.restorestate == "true") {
    //        $rootScope.$broadcast('restorestate'); //let everything know we need to restore state
    //        sessionStorage.restorestate = false;
    //    }
    //});

    ////let everthing know that we need to save state now.
    //window.onbeforeunload = function (event) {
    //    $rootScope.$broadcast('savestate');
    //};
    //});

}]);


//*********** GLOBAL RUN CONFIG EVENTS *************************//
app.run(['$rootScope', '$state', '$window', '$timeout', '$stateParams','errorHandler',

function ($rootScope, $state, $window, $timeout, $stateParams,errorHandler) {
        $rootScope.$state = $state;
           $rootScope.previouState;
           $rootScope.currentState;
           $rootScope.errorHandler = errorHandler;
          $rootScope.$stateParams = $stateParams;
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        console.log('statechangestart');
       
    });
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