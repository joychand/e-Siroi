﻿//****************************************************dept_regController*****************************************//
// The Single JavaScript file contains definitions of each eSiroi.Web Department Views Controllers declared in 'app.js'//
//**********************************Developed by N.Joychand Singh for NIC***************************************//




//departmentController
(function () {
    'use strict';

    angular
        .module('eSiroi.Web')
        .controller('departmentController', ['$scope', 'dept_sessionfactory','authService','$state', deptcontentController]);

    function deptcontentController($scope, dept_sessionfactory,authService,$state) {
        $scope.department = {};
        $scope.signOut= function () {
            authService.logOut();
            $state.go('Home');
        }
        


    }

})();
//deptcontentController
(function () {
    'use strict';

    angular
        .module('eSiroi.Web')
        .controller('deptcontentController', ['$scope','$rootScope', deptcontentController]);

    function deptcontentController($scope,$rootScope) {
        console.log($rootScope.value);
        
        
    }
  
})();

//deptHomeController
(function () {
    'use strict';

    angular
        .module('eSiroi.Web')
        .controller('deptHomeController', ['$state', '$scope', '$rootScope', 'dept_dataFactory', 'modalService', 'dept_sessionfactory', 'applications', deptHomeController]);

    function deptHomeController($state, $scope, $rootScope, dept_dataFactory, modalService, dept_sessionfactory, applications) {
       
       
        $scope.department.currUser = dept_sessionfactory.getCurrUser();
        $scope.applnStatus = ['Approved', 'DataEntered', 'Pending'];
        //var status = 'Approved';
        $scope.myData = applications.data;
        console.log($scope.myData);
        $scope.selectedStatus = $scope.applnStatus[0];
        //if (dept_sessionfactory.getCurrUser() == 'Operator')
        //{
        //    var status = 'Approved';
        //    $scope.selectedStatus = $scope.applnStatus[0];
        //}
        //else
        //{
        //    var status = 'DataEntered';
        //    $scope.selectedStatus = $scope.applnStatus[1];
        //}
        
       
        
       // getDeed(status);
        
        $scope.displayCollection = [].concat($scope.myData);


        //getAppln function status
        //function getDeed(Approved){
        //    var status = 'Approved';
        //    dept_dataFactory.getDeed(status).then(function (response) {
        //        $scope.myData = response.data;


        //    })
        //}

        // PROCESS ROW FUNCTION
       
         $scope.processrow =function(row)
         {
            // dept_sessionfactory.updateFormStatus();
             //dept_sessionfactory.putRow(row);
             //$state.go('department.content.scan')
        }
       
    }
})();

//dept_OnlineController
(function () {
    'use strict';

    angular
        .module('eSiroi.Web')
        .controller('dept_OnlineController', ['$state', '$scope', '$rootScope', 'dept_dataFactory', 'modalService', 'dept_sessionfactory', dept_OnlineController]);

    function dept_OnlineController($state, $scope, $rootScope, dept_dataFactory, modalService, dept_sessionfactory) {

        var status = $state.current.data.status;
        $scope.applnStatus = ['All', 'Applied', 'incomplete'];
        $scope.selectedStatus = $scope.applnStatus[1];
        getAppln(status);

        $scope.displayCollection = [].concat($scope.myData);

        $scope.getSelectedStatus = function () {
            if ($scope.selectedStatus && $scope.selectedStatus != 'All') {
                getAppln($scope.selectedStatus);
            }


        }

        //getAppln function status
        function getAppln(status) {

            dept_dataFactory.getOnlAppln(status).then(function (response) {
                $scope.myData = response.data;


            })
        }

        // PROCESS ROW FUNCTION

        $scope.processrow = function (row) {
            // dept_sessionfactory.updateFormStatus();
            dept_sessionfactory.putRow(row);
            $state.go('department.content.form')
        }

    }
})();

//dept regController
(function () {
    'use strict';

    angular
        .module('eSiroi.Web')
        .controller('dept_regController', ['$scope', '$state', 'majortrans', 'dept_sessionfactory', 'deptModalService', dept_regController]);

    function dept_regController($scope, $state, majortrans, dept_sessionfactory, deptModalService) {
        $scope.title = 'dept_regController';
        $scope.transactions = majortrans.data;
      
        $scope.proceed = function () {
            deptModalService.modelClear();
            dept_sessionfactory.clearModelList();
            //console.log($scope.links.dataSelected);
            $state.go('department.content.form');
        }
      
    }
})();

//deptmenuController
(function () {
    'use strict';

    angular
        .module('eSiroi.Web')
        .controller('deptmenuController', ['$scope', '$rootScope','$state', deptmenuController]);

    function deptmenuController($scope, $rootScope,$state) {
        $scope.$state = $state;
        //console.log($scope.$state.current.name);
       
    }
})();

//dept_loginController
(function () {
    'use strict';

    angular
        .module('eSiroi.Web')
        .controller('deptloginController', ['$scope', '$state', 'modalService', 'authService',deptloginController]);

    function deptloginController($scope, $state, modalService, authService) {
      

        
    }
    
})();

//LoginModalController
(function () {
    angular.module('eSiroi.Web')
    .controller('loginModalCtrl', ['$scope', '$modalInstance','dept_sessionfactory','authService','$state','$rootScope',loginModalCtrl]);
    function loginModalCtrl($scope, $modalInstance, dept_sessionfactory,authService,$state,$rootScope) {
        $scope.loginData = {
            userName: "",
            password: "",
            useRefreshTokens: false
        };
        $scope.message = "";
        // USER CLICK LOGIN EVENT
        $scope.login = function () {
           
           
            //TO DO GET USER CREDENTIALS VERIFY WITH THE BACKEND API
            authService.login($scope.loginData).then(function (response) {

                if ($scope.loginData.userName == 'tombi' || $scope.loginData.userName==='kaibem') {
                    if ($scope.loginData.userName === 'tombi')
                    {
                        dept_sessionfactory.putCurrUser('Operator');
                    }
                    else
                    {
                        dept_sessionfactory.putCurrUser('SR');
                    }
                    
                    $state.go('department.content.home');
                }
                else {
                    dept_sessionfactory.putCurrUser('Public');
                    $state.go('registration.content.apply')
                }
                
              
                  
                //$location.path('/orders');
                $modalInstance.close();
            },
             function (err) {
                 $scope.message = err.error_description;

             });
           // 
        }

        // USER CLICK CANCEL EVENT
        $scope.login.cancel = function () {
            $modalInstance.dismiss();
            //$state.go($rootScope.previousState);
        }
    }

})();
// #region dept_dataEntry_from Controller 
(function () {
    //'use strict';

    angular
        .module('eSiroi.Web')
        .controller('dataEntryformController', ['$scope', '$state', 'dept_sessionfactory', 'dataFactory', 'dept_dataFactory', 'deptModalService', 'modalService', '$rootScope', dataEntryformController]);

    function dataEntryformController($scope, $state, dept_sessionfactory, dataFactory, dept_dataFactory, deptModalService, modalService, $rootScope) {
        $scope.tsyear = {};
        $scope.visibility = true;
        $scope.click = false;

        //dropdown object declaration
        $scope.states = {};
        $scope.districts = {};
        $scope.subdivisions = {};
        $scope.revsubdivisions = {};
        $scope.villages = {};
        $scope.revvillages = {};
        $scope.postoffices = {};
        $scope.circles = {};
        $scope.landclass = {};
        $scope.landtype = {};
        $scope.exreason = {};
        //end dropdown declaration

        $scope.loadDone = false;
        $scope.online = {};
        $scope.session = {};
        $scope.Form = {};

        $scope.onlinedata = 'onlinecancel';
        angular.extend($scope.session, {
            exFormIsOnline: false,
            clFormIsOnline: false,
            idFormIsOnline: false,
            propFormIsOnline: false,
            OnlineStatus: 'offline',
            slnoddlVisibility: false,
            exFormFirstVisit: true,
            clFormFistVisit: true,
            idFormFirstVisit: true,
            propFormFistVisit: true,
            
        })

        $scope.exeslnolist = [];
        $scope.claimslnolist = [];
        $scope.identslnolist = [];
        $scope.propslnolist = [];

        deptModalService.idFormOnline.ddlview = 'offline';

     

            // *** inject dropdownlist data **//
            getStates();
            getDistricts();
            getSubDivisions();
            getRevSubdivions();
            getCircles();
            getVillages();
            getRevVillages();
           // getPoliceStations();
            getPostOffices();
            getExemReason();
            getlandclass();
            getlandtype();
            getOccupation();
            //$scope.occupations = ['Govt. employee', 'Business', 'Unemployed', 'Others'];
            $scope.unit = [
                {
                    unit:'H',
                    unitName:'Hectare'
                },
                {
                    unit:'A',
                    unitName:'Acre'
                },
                {
                    unit:'S',
                    unitName:'SqFeet'
                }
]
           // console.log($scope.unit[0]);

           // }
       
        //*****  function call to inject dropdownlist data from dataFactory *****//  

        function getStates() {
            dataFactory.getStates().then(function (states) {
                $scope.states = states;
                console.log('getStates' + $scope.states[21].stateName);
              
            });

        }

        function getDistricts() {
            dataFactory.getDistricts().then(function (districts) {
                $scope.districts = districts;
                
            });
        }


        function getSubDivisions() {
            dataFactory.getSubDivisions().then(function (subdivisions) {
                $scope.subdivisions = subdivisions;
            });
        }

        function getRevSubdivions() {
            dataFactory.getRevSubDivisions().then(function (revsubdiv) {
                $scope.revsubdivisions = revsubdiv;
            })
        }
        function getVillages() {
            dataFactory.getVillages().then(function (villages) {
                $scope.villages = villages;
            });
        }
        function getRevVillages() {
            dataFactory.getRevVillage().then(function (RevVillages) {
                $scope.revvillages = RevVillages;
            });
        }
        function getCircles() {
            dataFactory.getCircle().then(function (Circles) {
                $scope.Circles = Circles;
            });
        }
        //function getPoliceStations() {
        //    dataFactory.getPoliceStations().then(function (policestations) {
        //        $scope.policestations = policestations;
        //    });
        //}

        function getPostOffices() {
            dataFactory.getPostOffices().then(function (postoffices) {
                $scope.postoffices = postoffices;
            });
        }

        function getlandclass() {
            dept_dataFactory.getLandClass().then(function (response) {
                $scope.landclass = response.data;
            })
        }
        function getlandtype() {
            dept_dataFactory.getLandType().then(function (response) {
                $scope.landtype = response.data;
            })
        }
        
        function getExemReason() {
            dept_dataFactory.getExempReason().then(function (response) {
                $scope.exreason = response.data;
            })
        }
        function getOccupation() {
            dataFactory.getOccupation().then(function (response) {
                $scope.occupations = response.data;
            })
        }


        var row = dept_sessionfactory.getRow();
        console.log('previousstate: ' + $rootScope.previousState);
        if (row && $rootScope.previousState == 'department.content.onlineapplication') {

           
            getPropPartyList(row.ackno);
        }
        //GET ONLINE DATA
        function getPropPartyList(ackno) {
            dept_dataFactory.getOnlineExecutantList(ackno).then(function (response) {

                dept_sessionfactory.updateOnlineExecModal(response.data);

                // get Online execddllist
                dept_dataFactory.getOnlineExecddlist(ackno).then(function (response) {
                    dept_sessionfactory.updateOnlineExecddllModal(response.data);
                    // get Online ClaimantList
                    dept_dataFactory.getOnlineClaimantlist(ackno).then(function (response) {
                        //update claimantlist modal session
                        dept_sessionfactory.updateOnlineClaimModal(response.data);

                        dept_dataFactory.getclaimddlist(ackno).then(function (response) {
                            dept_sessionfactory.updateOnlineClaimddlModal(response.data);

                            // get Online Identifer list
                            dept_dataFactory.getOnlineIdentifierlist(ackno).then(function (response) {
                                //update Identiferlist modal session
                                dept_sessionfactory.updateOnlineIdentModal(response.data);

                                dept_dataFactory.getOnlineIdentddlist(ackno).then(function (response) {
                                    dept_sessionfactory.updateOnlineIdentddlModal(response.data);
                                    //get Online Property Details
                                    dept_dataFactory.getPropertyDetail(ackno).then(function (response) {
                                        dept_sessionfactory.updateOnlinePropModel(response.data);
                                        dept_dataFactory.getPropertyddl(ackno).then(function (response) {
                                            dept_sessionfactory.updateOnlinePropddlModel(response.data);

                                        }, function (result) { console.log('propertyddl fail'); });

                                    }, function (result) { console.log('getpropertydetail fails' + result) });

                                }, function (result) {
                                    console.log('getidentddlist fails' + result)
                                });
                            },
                            //getOnlineIdentifierList erros
                            function (result) {
                                console.log('get Identifer list errors: ' + result);
                            });
                        },
                        // getCaimantddlist errors
                        function (result) {
                            console.log('getClaimantddlist errors' + result);
                        });
                    },
                    // getclaimant errors
                    function (result) {
                        cosole.log('get Claimant list errors:' + result);
                    });
                    $scope.session.slnoddlVisibility = true; // flag used to display slno ddlist
                    $scope.session.OnlineStatus = 'online'; // Online status flag to toggle ddl online and offline
                    $scope.session.exFormIsOnline = true;   // ***********************************************
                    $scope.session.clFormIsOnline = true;  //   flag to populate online data to forms fields
                    $scope.session.idFormIsOnline = true;  // 
                    $scope.session.propFormIsOnline = true;//************************************************
                    //$scope.Form.deptRegform.$setDirty();



                }, function (result) {
                    console.log('getOnlineExecddlist fails' + result);
                });

            }, function (result) {
                console.log('getOnlineExecutantList fails ' + result)
            });
            $state.go('department.content.form');
        }
        $scope.getOnline = function () {
            $scope.onlinedata = 'getonline';
            
        }
       
        //get Online Data click
        $scope.onlineData = function () {

            getPropPartyList($scope.online.ackno);
            
            //dept_dataFactory.getOnlineExecutantList($scope.online.ackno).then(function (response) {
               
            //    dept_sessionfactory.updateOnlineExecModal(response.data);
               
            //    // get Online execddllist
            //    dept_dataFactory.getOnlineExecddlist($scope.online.ackno).then(function (response) {
            //        dept_sessionfactory.updateOnlineExecddllModal(response.data);
            //        // get Online ClaimantList
            //        dept_dataFactory.getOnlineClaimantlist($scope.online.ackno).then(function (response) {
            //            //update claimantlist modal session
            //            dept_sessionfactory.updateOnlineClaimModal(response.data);
                        
            //            dept_dataFactory.getclaimddlist($scope.online.ackno).then(function (response) {
            //                dept_sessionfactory.updateOnlineClaimddlModal(response.data);
                           
            //            // get Online Identifer list
            //            dept_dataFactory.getOnlineIdentifierlist($scope.online.ackno).then(function (response) {
            //                //update Identiferlist modal session
            //                dept_sessionfactory.updateOnlineIdentModal(response.data);
                           
            //                dept_dataFactory.getOnlineIdentddlist($scope.online.ackno).then(function (response) {
            //                    dept_sessionfactory.updateOnlineIdentddlModal(response.data);
            //                    //get Online Property Details
            //                    dept_dataFactory.getPropertyDetail($scope.online.ackno).then(function (response) {
            //                        dept_sessionfactory.updateOnlinePropModel(response.data);
            //                        dept_dataFactory.getPropertyddl($scope.online.ackno).then(function (response) {
            //                            dept_sessionfactory.updateOnlinePropddlModel(response.data);

            //                        }, function (result) { console.log('propertyddl fail'); });

            //                    }, function (result) { console.log('getpropertydetail fails' + result) });

            //                }, function (result) {
            //                console.log('getidentddlist fails' + result )});
            //            },
            //            //getOnlineIdentifierList erros
            //            function(result){
            //                console.log('get Identifer list errors: ' + result);
            //            });
            //            },
            //            // getCaimantddlist errors
            //            function (result) {
            //                console.log('getClaimantddlist errors' + result);
            //            });
            //         }, 
            //        // getclaimant errors
            //        function(result){
            //            cosole.log('get Claimant list errors:' + result);
            //        });
            //        $scope.session.slnoddlVisibility = true; // flag used to display slno ddlist
            //        $scope.session.OnlineStatus = 'online'; // Online status flag to toggle ddl online and offline
            //        $scope.session.exFormIsOnline = true;   // ***********************************************
            //        $scope.session.clFormIsOnline = true;  //   flag to populate online data to forms fields
            //        $scope.session.idFormIsOnline = true;  // 
            //        $scope.session.propFormIsOnline = true;//************************************************
            //        //$scope.Form.deptRegform.$setDirty();
                   
                       
                   
            //    }, function (result) {
            //        console.log('getOnlineExecddlist fails' + result);
            //    });

            //    }, function (result) {
            //    console.log('getOnlineExecutantList fails ' + result)
            //   });
            //$state.go('department.content.form');

        }

        // cancel online data click
        $scope.cancel = function () {
            var modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Ok',
                headerText: 'WARNING',
                bodyText: 'Are you sure you want to cancel online data entry?'
            };

            modalService.showModal({}, modalOptions).then(function (result) {
                $scope.session.exFormIsOnline = false,
               $scope.session.clFormIsOnline = false,
               $scope.session.idFormIsOnline = false,
               $scope.session.OnlineStatus = 'offline',
                $scope.session.slnoddlVisibility = false,
                $scope.session.exFormFirstVisit = true,
                $scope.session.clFormFistVisit = true,
                $scope.session.idFormFirstVisit = true
                dept_sessionfactory.clearModelList();
                deptModalService.modelClear();
                $scope.exeslnolist = [];
                $scope.claimslnolist = [];
                $scope.identslnolist = [];
                //deptModalService.claimant = {};
                //deptModalService.claim = {};
                //console.log('Pristine' + $scope.deptRegform.execform.$pristine);
                $scope.onlinedata = 'onlinecancel';
                //$scope.deptRegform.execform.$setPristine();
                $state.go('department.content.form');
            });
           
           
        }
       
    }


    
})();

// dept_dataEntry_from_deed controller //
(function () {
    angular.module('eSiroi.Web')
    .controller('deptDeedController', ['$scope', '$state', 'dept_sessionfactory', 'dataFactory', 'dept_dataFactory', 'deptModalService', 'modalService', deptDeedController])

    function deptDeedController($scope, $state, dept_sessionfactory, dataFactory, dept_dataFactory, deptModalService, modalService) {

       
         $scope.deed=deptModalService.deed;
         $scope.d=deptModalService.deedddl;
        // $scope.d.dop = new Date();

        /// Fee exempt reason radion button action
        $scope.isExemptYes = function (yes) {
            
            return yes === $scope.deed.FeeExempt
        }
        $scope.ondeedSubmit = function () {
            
            $scope.deed.TSNo = $scope.tsyear.ts;
            $scope.deed.TSYear = $scope.tsyear.tyear
            $scope.deed.Date_Time_Present = $scope.d.dop + $scope.d.time;
         
            dept_dataFactory.postdeed($scope.deed).then(function (response) {
                $state.go('department.content.form.property')
            }, function (result) {
                alert('deed details sumbit fails');
            })
        }
    }

})();

//dept_dataEntry_form_property Controller //
(function () {
    'use strict';

    angular
        .module('eSiroi.Web')
        .controller('deptPropController', ['$scope', '$state', 'district', '$http', '$modal', 'deptModalService', 'modalService', 'dept_sessionfactory', 'dept_dataFactory', deptPropController]);

    function deptPropController($scope, $state, district, $http, $modal, deptModalService, modalService, dept_sessionfactory, dept_dataFactory) {
        
        $scope.property = {};
        $scope.propertyddl = {};
        $scope.propertyList = [];
        $scope.propertyDdlList = [];
        $scope.PlotDetails = [];
        $scope.IsPlotFound = false;
        $scope.propertyList = dept_sessionfactory.getOnlinePropModel();
        $scope.propertyDdlList = dept_sessionfactory.getOnlinePropddlModel();
        //var objectA = [
        //    {
        //        state: 'Manipur',
        //        name: 'happu',
        //    },
        //    {
        //        state: 'delhi',
        //        name: 'happu2'
        //    }
        //];
        //var objectb = [
        //    {
        //        add: 'abc',
        //        po: '123'
        //    },
        //    {
        //        add: 'def',
        //        po: '456'
        //    }
        //];
        //console.log(angular.extend(objectA[0], objectb[0]));
        //console.log(objectA);
        //console.log(angular.merge(objectA, objectb));
        
        if ($scope.session.propFormIsOnline)
        {
            //****** for multiple property******

            //for (var i = 0; i < $scope.propertyList.length; i++) {
            //    $scope.propslnolist.push($scope.propertyList[i].slNo);

            //********************************

            deptModalService.property = $scope.propertyList[0];
            deptModalService.propertyddl = $scope.propertyDdlList[0];
            $scope.session.propFormIsonline = false;
            $scope.$on('$viewContentLoaded', function () {
                
                $scope.deptPropForm.$setDirty();
               // $scope.deptPropForm.$setValidity('required', true);
               // $scope.deptPropForm.$setValidity('error', true);
                console.log('propertyform: ' + $scope.deptPropForm.$dirty);
            });
        }

       

        $scope.property = deptModalService.property;
        $scope.propertyddl = deptModalService.propertyddl;

       // inject default values for first time visit
        if (!$scope.session.propFormIsonline && $scope.session.propFormFistVisit) {
            $scope.property.unit = $scope.unit[0].unit;
            console.log($scope.property.unit)
            $scope.session.propFormFistVisit = false;

        }
       
        
        $scope.nextparty = function () {
            var modaloptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Ok',
                headerText: 'Confirmation',
                bodyText: 'Do you want to submit the property details ?'
                //customData: $scope.session.propFormIsOnline
            };
            modalService.showModal({}, modaloptions).then(function (result) {
               
                console.log($scope.session.propFormIsOnline);
                if (!$scope.session.propFormIsOnline) {
                    angular.extend($scope.property, {
                        TSNo: $scope.tsyear.ts,
                        TSYear: $scope.tsyear.tyear,
                        state: 'Manipur',
                        district: $scope.propertyddl.district.distName,
                        subdivision: $scope.propertyddl.subdivsion.subDivName,
                        circle: $scope.propertyddl.circle.circleName,
                        village: $scope.propertyddl.village.villName
                    });
                }
                else
                {
                   angular.extend($scope.property,$scope.propertyddl)
                }
               
                console.log($scope.property);
               // dept_dataFactory.postPlotDetail($scope.property).then(function (result) {
                    $state.go('department.content.form.executant');
                //});
            });
        }
        //VERIFY PLOT FUNCTION
        $scope.verfyplot = function () {

            $http({
                method: 'GET',
                url: 'api/deptRegistraionController/' + $scope.property.dagNo + '/' + $scope.property.pattaNo + '/' + 'verfiyplot'
            }).then(function (response) {
                
                $scope.PlotDetails = response.data;
                $scope.IsPlotFound = true;
            }, function (result) {
                console.log('not found' + result);
                $scope.IsPlotFound = false;})
                .finally(function () {
                    console.log('finally');



                    var modalOptions = {
                        closeButtonText: 'Cancel',
                        actionButtonText: 'Ok',
                        headerText: 'PlotDetails',
                        bodyText: ''
                    };

                    var modalDefault = {
                        templateUrl: 'Home/plotVerifyModal',
                            controller: 'PlotVerifyModalInstanceCtrl',
                            //scope: $scope,
                            backdrop: 'static',
                            windowClass: 'app-modal-window',
                            resolve: {
                                IsPlotFound: function(){
                                    return $scope.IsPlotFound ;
                                },

                                plot: function () {
                                    return $scope.PlotDetails;
                                    //return (($scope.IsPlotFound)?$scope.PlotDetails:$scope.BlankPlot);
                                }
                            }

                    };
                   

                    modalService.showModal(modalDefault, modalOptions).then(function (result) {
                        alert('modalservice working');

                    });
                });
            
                       
        }

        


        $scope.saveproperty = function () {

            insertPlot();
            var modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Ok',
                headerText: 'Save Property Details?',
                bodyText: 'Are you sure you want to save the propertyDetails?'
            };

            modalService.showModal({}, modalOptions).then(function (result) {

            });
        }

        
    }
})();

// **** deptplotverify Modal Controller ******//
(function () {
    'use strict';
    angular
        .module('eSiroi.Web')
        .controller('PlotVerifyModalInstanceCtrl', ['$scope', '$modalInstance', 'plot', 'IsPlotFound', '$modal',
            function ($scope, $modalInstance,plot,IsPlotFound ,$modal) {
                $scope.visibility = false;
                $scope.mod = {};
                if (IsPlotFound)
                {
                    $scope.visibility = true;
                $scope.plot1 = plot;
                    //console.log($scope.plot);

               
                //$scope.gridOptions = { data: 'plot1' };
                }
                else
                {
                    $scope.message = 'Record not found';
                }
                $scope.gridOptions = { data: 'plot1' };
                $scope.mod.ok = function () {
                    $modalInstance.close();
                }

                $scope.mod.cancel = function () {
                    $modalInstance.dismiss();

                }
            }])

})();

// **dept_dataEntry_form_executant controller** //

(function () {
    'use strict';

    angular
        .module('eSiroi.Web')
        .controller('deptExeController', ['$scope', '$state', 'dataFactory', 'online', 'dept_sessionfactory', 'deptModalService', 'dept_dataFactory','$timeout', deptExeController]);

    function deptExeController($scope, $state, dataFactory, online, dept_sessionfactory, deptModalService, dept_dataFactory, $timeout) {

        $scope.online = online;
        $scope.executant = {};
        $scope.execddl = {};
        $scope.executantlist = [];
        $scope.execddlist = [];
        $scope.Elist = {}
        $scope.exForm = {};
        $scope.exForm.currSlno = 0;
        //$scope.Form.deptRegform.ExecSurName.$setViewValue($scope.Form.deptRegform.ExecSurName.$viewValue);
        //console.log('execsurname ' + $scope.Form.deptRegform.ExecSurName.$dirty);
        //console.log('execsurname ' + $scope.Form.deptRegform.ExecSurName.$pristine);
        
          
       
       
        // ***To get online data ***
        $scope.executantlist = angular.copy(dept_sessionfactory.getOnlineExecModallist());
       $scope.execddlist = angular.copy(dept_sessionfactory.getOnlineExecddlModallist());
        if ($scope.session.exFormIsOnline) {
           
           
            
              
                //  *** To be done *** Get Online Executantlist for first time
               
                for (var i = 0; i < $scope.executantlist.length; i++) {
                    
                    $scope.exeslnolist.push($scope.executantlist[i].slNo);
                }
               
                deptModalService.executant = $scope.executantlist[0];
                deptModalService.execddl = $scope.execddlist[0];
                // update the online status
                $scope.session.exFormIsOnline = false;
            // $scope.Form.execform.$setDirty();
                //$scope.$on('$viewContentLoaded', function () {
                //    console.log($scope.Form.execform);
                //    //$scope.Form.execform.ExecSurName.$dirty = true;
                //    $scope.Form.execform.$setDirty();
                //    $scope.Form.execform.ExecSurName.$dirty = true;
                //    $scope.Form.execform.ExecSurName.$valid = true;
                //   $scope.Form.execform.$setValidity('required', true);
                   

                //    console.log($scope.Form.execform.ExecSurName.$valid);
                //});
               
            }
            

        // Injecting executant from Modal Service
            $scope.executant = deptModalService.executant;             
            $scope.execddl = deptModalService.execddl;
           // console.log('hahahah');
            //console.log(deptModalService.execddl);
        // Set default values of the form fields
          
            if (!$scope.session.exFormIsonline && $scope.session.exFormFirstVisit)
            {
               
                //$scope.execddl.state = $scope.states[21];
                $scope.executant.slNo = $scope.exForm.currSlno + 1;
                $scope.exForm.currSlno = $scope.executant.slNo;
                $scope.session.exFormFirstVisit = false;
                //
            }
           
            
       // initialize dropdownlist       
        init();
        function init() {
            $scope.success = false;
            
            
        }
        
            
        //******* ONLINE SELECT EXECUTANT LIST **********/
        $scope.getselectedExecutant = function () {
            //console.log($scope.Elist.slNo);
           
            var currSlno = $scope.Elist.slNo;
            deptModalService.executant = $scope.executantlist[currSlno - 1];
            deptModalService.execddl = $scope.execddlist[currSlno - 1];
            $scope.executant = deptModalService.executant;
            $scope.execddl = deptModalService.execddl;
           
        }

        //***** exsubmit() button *********//
        $scope.onexsubmit = function () {
            console.log($scope.session.exFormIsOnline);
            if ($scope.session.OnlineStatus === 'offline') {
                angular.extend($scope.executant, {
                    tsno: $scope.tsyear.ts,
                    tsyear: $scope.tsyear.tyear,
                    state: $scope.execddl.state.stateName,
                    district: $scope.execddl.district.distName,
                    subDivison: $scope.execddl.subDivision.subDivName,
                    village: $scope.execddl.village.villName,
                    postOffice: $scope.execddl.postOffice.postOffice1,
                    pinCode: $scope.execddl.postOffice.pinCode,
                    //enterby: 'radha' 
                });

                
                dept_sessionfactory.pushExecutant($scope.executant);
               
                              
            }
            else {
                for (var i = 0; i < $scope.executantlist.length; i++) {
                    console.log($scope.execddlist);
                    $scope.executantlist[i].tsno = $scope.tsyear.ts;
                    $scope.executantlist[i].tsyear = $scope.tsyear.tyear;
                    $scope.executantlist[i].enterby = 'radha';
                    angular.extend($scope.executantlist[i], $scope.execddlist[i]);
                }

                dept_sessionfactory.putOnlineExecutantlist($scope.executantlist)
                console.log('hahah');
                console.log($scope.executantlist);
                console.log($scope.execddlist);
            }
           // var exe = dept_sessionfactory.getExecutantlist();
            //console.log(exe[0].state);
            $state.go('department.content.form.claimant');
        }

    }
})();   

//dept_dataEntry_form_claimant Controller//

(function () {
    'use strict';

    angular
        .module('eSiroi.Web')
        .controller('deptClaimController', ['$scope', '$state', 'dept_sessionfactory', 'deptModalService', 'dept_dataFactory',deptClaimController]);

    function deptClaimController($scope, $state, dept_sessionfactory, deptModalService, dept_dataFactory) {

        $scope.clOnlinestatus='false'
        $scope.claimant = {};
        $scope.claim = {};
        $scope.claimantlist = [];
        $scope.claimddlist = [];
        $scope.Clist = {}
        $scope.claimsession = {};
        $scope.clForm = {};
        $scope.clForm.currSlno = 0;

        // console.log(deptModalService.claimant);
        $scope.claimantlist = dept_sessionfactory.getOnlineClaimModallist();
        $scope.claimddlist = dept_sessionfactory.getOnlineCalimddlModal();
        console.log($scope.session.clFormIsOnline);
        if ($scope.session.clFormIsOnline)
        {
            //get claimantlist for online data
            
            for (var i = 0; i < $scope.claimantlist.length; i++) {

                $scope.claimslnolist.push($scope.claimantlist[i].slNo);
            }
            
            deptModalService.claimant = $scope.claimantlist[0];
            deptModalService.claim = $scope.claimddlist[0];
            $scope.session.clFormIsOnline = false;
            
        }
        $scope.claimant = deptModalService.claimant;
       $scope.claim = deptModalService.claim;
     
        // inject default value of forms fields
       if (!$scope.session.clFormIsOnline && $scope.session.clFormFistVisit)
       {
          // $scope.claim.state = $scope.states[21];
           $scope.claimant.slNo = $scope.clForm.currSlno + 1;
           $scope.clForm.currSlno = $scope.claimant.slNo;
           $scope.session.clFormFistVisit = false;
           
       }

        // Claimant Online Slno change function
        $scope.getselectedClaimant = function () {
            var currSlno = $scope.Clist.slNo;
            deptModalService.claimant = $scope.claimantlist[currSlno - 1];
            deptModalService.claim = $scope.claimddlist[currSlno - 1];
            $scope.claimant = deptModalService.claimant;
           $scope.claim = deptModalService.claim;
        }

        $scope.onClaimantSubmit = function () {

            if ($scope.session.OnlineStatus === 'offline') {
                angular.extend($scope.claimant, {
                    tsno: $scope.tsyear.ts,
                    tsyear: $scope.tsyear.tyear,
                    state: $scope.claim.state.stateName,
                    district: $scope.claim.district.distName,
                    subDivison: $scope.claim.subDivision.subDivName,
                    village: $scope.claim.village.villName,
                    postOffice: $scope.claim.postOffice.postOffice1,
                    pinCode: $scope.claim.postOffice.pinCode,
                    enterby: 'radha' 
                });

                
                dept_sessionfactory.pushClaimant($scope.claimant);
               
                              
            }
            else {
                for (var i = 0; i < $scope.claimantlist.length; i++) {

                    $scope.claimantlist[i].tsno = $scope.tsyear.ts;
                    $scope.claimantlist[i].tsyear = $scope.tsyear.tyear;
                    $scope.claimantlist[i].enterby = 'radha';
                    angular.extend($scope.claimantlist[i], $scope.claimddlist[i])
                }

                dept_sessionfactory.putOnlineClaimantlist($scope.claimantlist)
            }
            console.log(dept_sessionfactory.getClaimantlist());
          $state.go('department.content.form.identifier')
        }
       
    }
})();

//dept_dataEntry_form_Identifier Controller//

(function () {
    'use strict';

    angular
        .module('eSiroi.Web')
        .controller('deptIdentController', ['$scope', '$state','dept_sessionfactory', 'deptModalService', 'dept_dataFactory', deptIdentController]);

    function deptIdentController($scope, $state,dept_sessionfactory, deptModalService, dept_dataFactory) {
        $scope.ident = {};
        $scope.identifier = {};
        $scope.identifierlist = [];
        $scope.identddlist = [];
        $scope.Ilist = {};
        $scope.idForm = {};
        $scope.idForm.currSlno = 0;
        $scope.ddlview = deptModalService.idFormOnline.ddlview;

        $scope.identifierlist = dept_sessionfactory.getOnlineIdentModallist();
        $scope.identddlist = dept_sessionfactory.getOnlineIdentddlModal();
        if ( $scope.session.idFormIsOnline) {
            //get claimantlist for online data
           
            for (var i = 0; i < $scope.identifierlist.length; i++) {

                $scope.identslnolist.push($scope.identifierlist[i].slNo);
            }

            deptModalService.identifier = $scope.identifierlist[0];
            
            deptModalService.ident = $scope.identddlist[0];
            console.log(deptModalService.ident);
            $scope.session.idFormIsOnline = false;
           
        }
        $scope.identifier = deptModalService.identifier;
        $scope.ident = deptModalService.ident;

        // inject default value
        if (!$scope.session.idFormIsOnline && $scope.session.idFormFirstVisit)
        {
            $scope.identifier.slNo = $scope.idForm.currSlno + 1;
            $scope.idForm.currSlno = $scope.identifier.slNo;
           // $scope.ident.state = $scope.states[21];
        }

        $scope.getselectedIdentifier = function () {
            var currSlno = $scope.Ilist.slNo;
            deptModalService.identifier = $scope.identifierlist[currSlno - 1];
            deptModalService.ident = $scope.identddlist[currSlno - 1];
            $scope.identifier = deptModalService.identifier;
            $scope.ident = deptModalService.ident;
        }
        
        $scope.formsubmit = function () {
            //prepare identifier list
            if ($scope.session.OnlineStatus === 'offline') {
                angular.extend($scope.identifier, {
                    tsno: $scope.tsyear.ts,
                    tsyear: $scope.tsyear.tyear,
                    state: $scope.ident.state.stateName,
                    district: $scope.ident.district.distName,
                    subDivison: $scope.ident.subDivision.subDivName,
                    village: $scope.ident.village.villName,
                    postOffice: $scope.ident.postOffice.postOffice1,
                    pinCode: $scope.ident.postOffice.pinCode,
                    enterby: 'radha' 
                });

                
                dept_sessionfactory.pushIdentifier($scope.identifier);
               
                              
            }
            else {
                for (var i = 0; i < $scope.identifierlist.length; i++) {

                    $scope.identifierlist[i].tsno = $scope.tsyear.ts;
                    $scope.identifierlist[i].tsyear = $scope.tsyear.tyear;
                    $scope.identifierlist[i].enterby = 'radha';
                    angular.extend($scope.identifierlist[i], $scope.identddlist[i]);
                }

                dept_sessionfactory.putOnlineIdentifierList($scope.identifierlist)
            }
            //#region post the party details
           
           dept_dataFactory.postdeptexecutantlist(dept_sessionfactory.getExecutantlist()).then(function (response) {
                console.log('registration data successfully  submitted');
                dept_dataFactory.postClaimantList(dept_sessionfactory.getClaimantlist()).then(function (response) {
                    dept_dataFactory.postIdentifierList(dept_sessionfactory.getIdentifierList()).then(function (response) {
                        $state.go('department.content.dataentered');
                    }) 
                })
               
            })
           
        }
        //#endregion
        $scope.displayModal=function(){
            console.log('identifier district modal' + $scope.ident.district.distName)
        }
       
        //window.onbeforeunload = function (event) {
        //    var message = 'Sure you want to leave?';
        //    if (typeof event == 'undefined') {
        //        event = window.event;
        //    }
        //    if (event) {
        //        event.returnValue = message;
        //    }
        //    return message;
        //}
    }
})();

//#region HELPER FUNCTIONS
function insertPlot($scope) {

}

