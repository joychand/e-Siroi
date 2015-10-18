
/// <reference path = ~/scripts/angular.js />
/// <reference path = ~/scripts/app/factory/datafactory.js>
/// <reference path = ~/scripts/app/app.js>
'use strict';
angular
.module('eSiroi.Web')
    .controller('ModalInstanceCtrl', ['$state','$scope', '$modalInstance','ackno',
    function ($state,$scope, $modalInstance, ackno) {
        $scope.mod = {};
        $scope.ackno = ackno;
        

        $scope.mod.ok = function () {
            
            $modalInstance.close('dfd');
            
        };

        $scope.mod.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]);

//***********APPLY REGISTRATION SIGN UP CONTROLLER***********************//
(function () {
    angular.module('eSiroi.Web')
    .controller('applyRegistrationController',['$scope','$state','dataFactory','sessionFactory','ApplyRegModel','modalService','authService','userService', function ($scope, $state, dataFactory,sessionFactory,ApplyRegModel,modalService, authService, userService) {
        $scope.loginData = {
            userName: "",
            password: "",
            useRefreshTokens: false
        };
        $scope.message = '';
        $scope.transactions = {};
       
        
        $scope.onlineapplication = {};
       
        $scope.sro = {};
        $scope.loginVisibility = 'clickLogin';
        $scope.applylogin={}
        init();
        function init() {
            $scope.loading = true;
            getMajortransaction();
            getsro();


        }

        function getsro() {
            dataFactory.getSRO().then(function (response) {
                $scope.sro = response.data;
            })
        }

        function getMajortransaction() {
            dataFactory.getMajortransaction().then(function (response) {
                $scope.transactions = response.data;
            },
            function (result) { })
            .finally(function () {
                $scope.loading = false;
            });

        }

        function sessionTransName(tran_Name) {
            sessionFactory.putTransName(tran_Name)
        }

        function getsession() {
            $scope.data = sessionFactory.getData();


        }
        //next property add page
        $scope.next = function () {
           
                ApplyRegModel.onlineapplication = $scope.onlineapplication;
                dataFactory.getSroName(ApplyRegModel.onlineapplication.sro).then(function (sroName) {
                    ApplyRegModel.sroName = sroName[0];
                   

                    dataFactory.getTransName(ApplyRegModel.onlineapplication.trans_maj_code).then(function (transName) {
                        ApplyRegModel.transName = transName[0];
                        
                        $state.go('registration.content.forms.propertydetails');
                    })
                   
                })
               
               

        
        }

        $scope.clearform = function () {
            $scope.onlineapplication = {}
            $scope.confmpasswd = '';
            $scope.regapplyform.$setPristine();
        }

       
        $scope.onloginClick = function () {
            $scope.loginVisibility = 'Login';
            $scope.click = true;
            //$scope.state = $state;
            //$state.go('registration.content.apply.login')
        }
        //login with application no
        $scope.login = function () {
            console.log($scope.loginData);
            authService.login($scope.loginData).then(function (response) {
                
                if (userService.userInPublic) {
                   // var ackno = parseInt($scope.loginData.userName);
                    dataFactory.getOApplicationModel($scope.loginData.userName.toString()).then(function (result) {
                        ApplyRegModel.onlineapplication = result.data[0];
                        ApplyRegModel.onlineapplication.intackno = result.data[0].ackno;
                        dataFactory.getSroName(ApplyRegModel.onlineapplication.sro).then(function (sroName) {
                            ApplyRegModel.sroName = sroName[0];


                            dataFactory.getTransName(ApplyRegModel.onlineapplication.trans_maj_code).then(function (transName) {
                                ApplyRegModel.transName = transName[0];

                            })

                        })
                        $state.go('registration.content.publicHome')
                    })
                    

                }
                else {
                    $scope.message = 'Invalid Username\Password'
                }

            },
                    function (err) {
                             $scope.hideMessage = false;
                             $scope.message = err.error_description;

                });
        }

        $scope.loginCancel = function () {
            $scope.loginVisibility = 'clickLogin';
            $scope.loginData = {
                userName: "",
                password: "",
                useRefreshTokens: false
            };

        }

       

    }]);
})();


// ****** REGISTRATION APPLY FORMS CONTROLLER ******************//
(function () {
    angular
       .module('eSiroi.Web')
       .controller('registrationController',['$scope', '$state', 'dataFactory',  '$rootScope', 'sessionFactory', 'ModalService', '$modal', '$log', 'ApplyRegModel', 'dept_dataFactory', 'modalService','$http', registrationController]);
    function registrationController ($scope, $state, dataFactory,  $rootScope, sessionFactory, ModalService, $modal, $log, ApplyRegModel, dept_dataFactory, modalService,$http) {
        $scope.title = 'registrationController';
        //****** COMMON VARIABLES ********//
        $scope.districts = {};
        $scope.subdivisions = {};
        $scope.revsubdivisions = {};
        $scope.states = {};
        $scope.villages = {};
        $scope.RevVillages = {}
        $scope.postoffices = {};
        $scope.policestations = {};
        $scope.occupations = [];
        $scope.landclass = {};
        $scope.landtype = {};
        $scope.tabdisabled = true;
        $scope.disabled = true;
        $scope.unit = [
            {
                unitcode: "H",
                unitName: "Hectare"

            },
            {
                unitcode: "A",
                unitName: "Acre"
            },

            {
                unitcode: "S",
                unitName: "Sq Feet"
            }
    ]

       
        $scope.regForm = {
            execTabdisabled: true,
            claimTabdisabled: true,
            identTabdisabled:true};


        angular.extend($scope.regForm, {
            transname: ApplyRegModel.transName,
            sroName: ApplyRegModel.sroName

        })

        //***** PROPERTYFORM VARIABLES********//
        $scope.propertyObject = {};
        $scope.property = {};
        $scope.propertyddl = {};
        $scope.property.unit = $scope.unit[0].unitcode;
        $scope.prpertyList = [];
        $scope.pformModel ={}
        angular.extend($scope.pformModel, {
            submitted: false
        })
        //**** EXECUTANTFORM VARIABLES
        $scope.executant = {};
        $scope.exec = {};
        $scope.executantList = [];
       
        $scope.execSlno = 1;
        //**** CLAIMANTFORM VARIABLES *****//
        $scope.claimant = {}
        $scope.claim = {};
        $scope.claimantList = [];
        $scope.claimantObject = {};
        $scope.claimSlno = 1;
        $scope.cformModel = {};
       //*****IDENTIFIERFORM VARIABLES *****//
        $scope.identifier = {}
        $scope.ident = {};
        $scope.identifierList = [];
        $scope.ident.slno = 1;
        $scope.iformModel = {};
        $scope.pinCode = '';
        $scope.tempExecutant = {};
        $scope.claimant.slno = 1;
        $scope.ident.slno = 1;
        $scope.identSlno = 1;
        $scope.success = false;
        
       
      
        
        // 
        //$scope.postoffice = {};
       
        //console.log($scope.regForm.sroName);
        $scope.circles = {}
        
        $scope.trans = {};
       
        
       
        
       
        $scope.postoffice = {};
        $scope.aa = {};
       
        $scope.district = {};
        $scope.subdiv = {};
        $scope.village = {};
       
       
        $scope.readonly = false;
        //$scope.transName = {}
        
       
        
        init();

       

        function init() {
           


            //property details
            getDistricts();
            getRevSubdivions();
            getCircles()
            getRevVillages()
            //getTransName()
            //getSro()
          
           
            //party details
           
            getSubDivisions();
            getStates();
            getPoliceStations();
            getPostOffices();
            getVillages();
            // $scope.occupations = ['Govt. employee', 'Business', 'Unemployed', 'Others'];
            getoccupations()
            getLandtype();
            getLandclass();
                    
        }
        function getStates() {
            dataFactory.getStates().then(function (states) {
                $scope.states = states;
                $scope.state = $scope.states[21];
            });

        }
        function getDistricts() {
            dataFactory.getDistricts().then(function (districts) {
                $scope.districts = districts;
            });
        }
        function getRevSubdivions() {
            dataFactory.getRevSubDivisions().then(function (revsubdiv) {
                $scope.revsubdivisions = revsubdiv;
            })
        }
        function getSubDivisions() {
            dataFactory.getSubDivisions().then(function (subdivisions) {
                $scope.subdivisions = subdivisions;
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
        
        function getVillages() {
            dataFactory.getVillages().then(function (villages) {
                $scope.villages = villages;
            });
        }

        function getPoliceStations() {
            dataFactory.getPoliceStations().then(function (policestations) {
                $scope.policestations = policestations;
            });
        }

        function getPostOffices() {
            dataFactory.getPostOffices().then(function (postoffices) {
                $scope.postoffices = postoffices;
            });
        }

        function getLandtype() {
            dept_dataFactory.getLandType().then(function (response) {
                $scope.landtype = response.data;
            })
        }

        function getLandclass() {
            dept_dataFactory.getLandClass().then(function (response) {
                $scope.landclass = response.data;
            })
        }

        function getoccupations() {
            dataFactory.getOccupation().then(function (response) {
                $scope.occupations = response.data;
            })
        }
       
        $scope.exec.clrpincode = function () {
            return $scope.postoffice.pinCode = '';
        };
    
        $scope.exec.onClickTab = function (tab) {
            $scope.exec.currentTab = tab.url;
        }

        $scope.exec.isActiveTab = function (tabUrl) {
            return tabUrl == $scope.exec.currentTab;
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
                $scope.IsPlotFound = false;
            })
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
                            IsPlotFound: function () {
                                return $scope.IsPlotFound;
                            },

                            plot: function () {
                                return $scope.PlotDetails;
                                //return (($scope.IsPlotFound)?$scope.PlotDetails:$scope.BlankPlot);
                            }
                        }

                    };

                    modalService.showModal(modalDefault, modalOptions).then(function (result) {
                        

                    },function(reason){
                        alert('popup not working');
                    });
                });


        }

        //***** PROPERTY FORM SUBMIT********//
        $scope.nextparty = function () {
           
            var modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'submit',
                headerText: 'Confirmation',
                bodyText: 'Do you want to submit the propertyDetails ?'
            };
            modalService.showModal({}, modalOptions).then(function (result) {
               
                //POST PROPERTY DETAIL 
                $scope.pformModel.submitted = true;
                    //ApplyRegModel.onlineapplication.ackno = 0;
                   
                   

                dataFactory.postonlineapplication(ApplyRegModel.onlineapplication).then(function (response) {
                    var regApplication = response.data;
                    console.log(response.data);
                    //ApplyRegModel.onlineapplication.ackno = regApplication.ackno;
                    ApplyRegModel.onlineapplication.year = regApplication.year;
                    ApplyRegModel.onlineapplication.ackno = regApplication.ackno.toString() + ApplyRegModel.onlineapplication.sro + ApplyRegModel.onlineapplication.year;
                    ApplyRegModel.onlineapplication.intackno = regApplication.ackno;

                   
                    //var currackno = response.data;
                    sessionFactory.putCurrAckno(regApplication.ackno);
                    $scope.trans.currAckno = ApplyRegModel.onlineapplication.ackno;
                    var usrModel = {};
                   angular.extend(usrModel, {
                     Username: ApplyRegModel.onlineapplication.ackno,
                     Password: ApplyRegModel.onlineapplication.password,
                     ConfirmPassword: ApplyRegModel.onlineapplication.password,
                     RoleName:'public'
                    })
                   dataFactory.signUpUsr(usrModel).then(function (result) {
                                $scope.property.state = 'Manipur';
                                $scope.property.ackno = ApplyRegModel.onlineapplication.ackno;
                                $scope.property.district = $scope.propertyddl.district.distName;
                                $scope.property.subdivision = $scope.propertyddl.subdivsion.subDivName;
                                $scope.property.Circle = $scope.propertyddl.circle.circleName;
                                $scope.property.Village = $scope.propertyddl.village.villName;
                                dataFactory.postProperty($scope.property)
                                .then(function (response) {
                                    $scope.regForm.execTabdisabled = false;
                                    $scope.execActive = true;
                                    $state.go('registration.content.forms.executant')
                                    ;
                                });
                                
                            }, function (error) {
                                alert('registration fails')
                            });
                     
                        })

                //#region POSTPROPERTYOLDVERSION
              //  dataFactory.postProperty($scope.property)
              //.then(function (response) {
              //    sessionFactory.putCurrAckno(response.data);
              //    $scope.trans.currAckno = response.data;


              //    $scope.pformModel.submitted = true;
              //    ApplyRegModel.onlineapplication.ackno = response.data;
              //    ApplyRegModel.onlineapplication.year = '2015';
              //    ApplyRegModel.onlineapplication.date = '';
                 
              //    ApplyRegModel.onlineapplication.status = 'incomplete';
              //    console.log(ApplyRegModel.onlineapplication);
              //    dataFactory.postonlineapplication(ApplyRegModel.onlineapplication).then(function (reponse) {
              //        $scope.identTabdisabled = false;
              //        console.log(ApplyRegModel.onlineapplication);
              //        var usrModel = {};
              //        angular.extend(usrModel, {
              //            Username: ApplyRegModel.onlineapplication.ackno,
              //            Password: ApplyRegModel.onlineapplication.password,
              //            ConfirmPassword: ApplyRegModel.onlineapplication.password,
              //            RoleName:'public'
              //        })
              //        dataFactory.signUpUsr(usrModel).then(function (result) {
              //            $scope.regForm.execTabdisabled = false;
              //            $scope.execActive = true;
              //            $state.go('registration.content.forms.executant');
              //        }, function (error) {
              //            alert('registration fails')
              //        });
                     
              //    })

                //})
                //#endregion

            })
           
           

           
            //sessionFactory.pushProperty($scope.propertyObject);
            //var propertyData = sessionFactory.getProperty();
            //console.log(propertyData[0].district);
          
              
            
        }

        $scope.eformModel = {};
        angular.extend($scope.eformModel, {
            submitted: false
        });
        
        //executant submit
        $scope.onexsubmit = function () {
            
            createExecutantObject();
            $scope.eformModel.submitted = true;
            $scope.claimActive=true
            $scope.regForm.claimTabdisabled = false;
            $state.go('registration.content.forms.claimant')
            
        };

        // executant add more
        $scope.execAddmore = function () {
            createExecutantObject();
            $scope.$$childTail.execform.$setPristine();
            $scope.executant = {};
            $scope.exec = {};
            $scope.aa = {};
            $scope.executant.slno = $scope.execSlno + 1;
            $scope.execSlno = $scope.executant.slno;
        }
        //prepare executantObject
        var createExecutantObject = function () {
            angular.extend($scope.executant, {
            State: $scope.state.stateName,
            District: $scope.exec.district.distName,
            SubDivision: $scope.exec.subdiv.subDivName,
            Village:$scope.exec.village.villName,
            PostOffice:$scope.exec.postoffice.postOffice1,
            Ackno: ApplyRegModel.onlineapplication.ackno,
            SlNo:$scope.execSlno,         
            pinCode:$scope.exec.postoffice.pinCode,
            
            })
            console.log($scope.executant);
           
            sessionFactory.pushExecutant($scope.executant);
        }

      
        // prepare claimant Model
        var createClaimantObject = function () {
            angular.extend($scope.claimant, {
            SlNo: $scope.claimSlno,  
            State :$scope.state.stateName,
            District : $scope.claim.district.distName,
            SubDivision :$scope.claim.subdiv.subDivName,
            Village : $scope.claim.village.villName,
            PostOffice : $scope.claim.postoffice.postOffice1,
            Ackno: ApplyRegModel.onlineapplication.ackno,
            pinCode : $scope.claim.postoffice.pinCode,
            
            })
           console.log($scope.claimant)
            sessionFactory.pushClaimant($scope.claimant);

        }
        //add more claimant
        $scope.claimantAddmore = function () {
            createClaimantObject();
            // flush $scope variable
            $scope.claimant = {};
            $scope.claim = {};
            $scope.claimant.slno = $scope.claimSlno + 1;
            $scope.claimSlno = $scope.claimant.slno;
        }

        //submit claimant
        $scope.onclaimantsubmit = function () {
            createClaimantObject();
            $scope.identActive = true
            $scope.regForm.identTabdisabled = false;
            $state.go('registration.content.forms.identifier');
        }
        //addmore
        $scope.identAddmore = function () {
            console.log($scope.identSlno);
            createIdentifierObject();
           // sessionFactory.pushIdentifier($scope.identifier);
            //flush $scope
            $scope.identifier = {};
            $scope.ident = {};
            $scope.ident.slno = $scope.identSlno + 1;
            $scope.identSlno = $scope.ident.slno;

        }

        // create Identifier object
        var createIdentifierObject = function () {
            angular.extend($scope.identifier, {
                SlNo: $scope.ident.slno,
                State :$scope.state.stateName,
                District : $scope.ident.district.distName,
                SubDivision :$scope.ident.subdiv.subDivName,
                Village : $scope.ident.village.villName,
                PostOffice : $scope.ident.postoffice.postOffice1,
                Ackno: ApplyRegModel.onlineapplication.ackno,
                pinCode : $scope.ident.postoffice.pinCode,
                identify: $scope.ident.identify
            })
            console.log($scope.identifier);
            
            sessionFactory.pushIdentifier($scope.identifier);
        }

        $scope.items = ['item1', 'item2', 'item3'];
        
        //submit the Registration forms
        $scope.formsubmit = function () {
            var modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'submit',
                headerText: 'Confirmation',
                bodyText: 'Do you want to submit the application ?'
            };
            modalService.showModal({}, modalOptions).then(function (result) {
                createIdentifierObject();
                postpartydetail();


              

            });

        }
   
        function postpartydetail () {
            dataFactory.postexecutant(sessionFactory.getExecutantList())
                      .then(function (response) {
                          console.log('ExecutantList inserted');
                          dataFactory.postclaimant(sessionFactory.getClaimantList())
                              .then(function (response) {
                                  console.log('claimantList inserted');
                                  dataFactory.postidentifier(sessionFactory.getIdentifierList())
                                  .then(function (response) {
                                      console.log('idetifierlist inserted');
                                      updateApplnStatus();
                                      sessionFactory.clearSession();
                                    

                                  });
                              });
                      });

        }
        function updateApplnStatus() {
            dataFactory.updateApplnStatus(ApplyRegModel.onlineapplication.intackno).then(function (response) {
                // DISPLAY COMPLETION SUCCESS MODAL
                var modalOptions = {
                    closeButtonText: 'Cancel',
                    actionButtonText: 'Ok',
                    headerText: 'Application Successfully submitted',
                    bodyText: 'Your Acknowledgement No. is: ',
                    customData: ApplyRegModel.onlineapplication.ackno
                };
                modalService.showModal({}, modalOptions).then(function (result) {
                    $state.go('registration.content.applyregsuccess');

                })
               
            })
        }

}


  
    

}());


//****** REGISTRATION SUCCESS PAGE CONTROLLER
//ApplySuccessController
(function () {
    angular.module('eSiroi.Web')
    .controller('ApplySuccessController', ['$scope', 'modalService', 'sessionFactory','$state','ApplyRegModel', ApplySuccessController]);

    function ApplySuccessController($scope, modalService, sessionFactory, $state, ApplyRegModel) {

        $scope.currAckno = ApplyRegModel.onlineapplication.ackno;
        $scope.getdraftdeed=function() {
           
            var modalOptions = {
                closeButtonText: 'Print',
                actionButtonText: 'Ok',
                headerText: 'DRAFT DEED',


            };
            var modalDefault = {
                templateUrl: 'Home/draftDeeed',
                //    controller: 'loginMocalCtrl',
                backdrop: 'static',
                windowClass: 'app-modal-window'
            };

            modalService.showModal(modalDefault, modalOptions).then(function (result) {
                console.log('hahaha');
            })
        }
        $scope.prntAck = function () {
            $state.go('report.ack');
        }
    }
})();

//#regionPUBLICCONTROLLER
//publicHomeCtrl
(function () {
    angular.module('eSiroi.Web')
.controller('publicHomeCtrl', ['$scope', '$state', 'dataFactory', 'authService', 'publicFactory', 'modalService', function ($scope, $state, dataFactory, authService, publicFactory, modalService) {
    $scope.myData = {};
    $scope.message = '';
    $scope.displayCollection={}
    if (authService.authentication.userName) {
        var ackno = parseInt(authService.authentication.userName)

    }

    dataFactory.getOnlineApplnStatus(ackno).then(function (result) {
        $scope.myData = result.data[0];
        console.log($scope.myData);
        $scope.displayCollection = [].concat($scope.myData);
    });
   
    $scope.getSchedules = function (row) {
        console.log(row);
        var stringackno = row.ackno + row.roCode.toString() + row.year;
       
        publicFactory.getSchedules(stringackno).then(function (result) {
            $scope.appointment = result.data[0];
            $scope.date1 = result.data[0].date1;
            var modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Ok',
                //headerText: 'Appointment',
                //bodyText: 'Your Appointment is scheduled at: ',
                customData: $scope.appointment
            };
            var modalDefaults = {
                templateUrl: 'Public/appntView',
                backdrop: 'static',
                windowClass: 'app-modal-window'

            }
            modalService.showModal(modalDefaults, modalOptions).then(function (result) {
                

            })
        })
    }
        

    
}])
})();
//printAcknowledgement
(function () {
    angular.module('eSiroi.Web')
.controller('publicPrintackCtrl', ['ApplyRegModel', '$state', '$scope', 'dataFactory', '$window', function (ApplyRegModel, $state, $scope, dataFactory, $window) {
    var applnObject = {};
    console.log(ApplyRegModel.onlineapplication);
    angular.extend(applnObject, {
        ackno: ApplyRegModel.onlineapplication.intackno,
        sro:ApplyRegModel.onlineapplication.sro,
        trans_code:ApplyRegModel.onlineapplication.trans_maj_code,
        year:ApplyRegModel.onlineapplication.year
    })
    dataFactory.getAckn(applnObject).then(function (result) {
        console.log(result.data);
        $scope.displayCollection = [].concat(result.data[0]);
        $scope.displayCollection[0].transName = ApplyRegModel.transName;
        $scope.displayCollection[0].sroName = ApplyRegModel.sroName;
    })
    
    $scope.printout = function () {
        $window.print();
    }
}])
})();

//#endregion PUBLICCONTROLLER