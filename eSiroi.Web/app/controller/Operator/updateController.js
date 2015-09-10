'use strict';
(function () {
    angular.module('eSiroi.Web')
        .controller('updateController', ['$scope', '$state', 'dept_dataFactory', 'dept_sessionfactory', 'dataFactory', 'deptModalService', function updateController($scope, $state, dept_dataFactory, dept_sessionfactory, dataFactory, deptModalService) {

            $scope.upForm = {}
            $scope.updeedForm = {}
            $scope.upPropForm = {}
            $scope.upExecForm = {}
            $scope.upClaimForm = {}
            $scope.upIdentForm = {}
            
            angular.extend($scope.upForm, {
                tsno: deptModalService.onlineAppln.tsno,
                tsyear: deptModalService.onlineAppln.tsyear
              });
            angular.extend($scope.upExecForm, {
                firstVisit: true,
                fieldReadOnly: true,
                exeslnolist:[]
               
            });
            angular.extend($scope.upClaimForm, {
                firstVisit: true,
                fieldReadOnly: true,
                claimslnolist:[],

            });
            angular.extend($scope.upIdentForm, {
                firstVisit: true,
                fieldReadOnly: true,
                identslnolist:[]

            });
            angular.extend($scope.upPropForm, {
                firstVisit: true,
                fieldReadOnly: true

            });
            

            $scope.unit= [
                           {
                               unit: 'H',
                               unitName: 'Hectare'
                           },
                           {
                               unit: 'A',
                               unitName: 'Acre'
                           },
                           {
                               unit: 'S',
                               unitName: 'SqFeet'
                           }
            ]
            //init functions
            getExemReason();
            getlandclass();
            getlandtype();
            getOccupation();
            getPropPartyList(deptModalService.onlineAppln);
            console.log(deptModalService.onlineAppln)

            //helper functions
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
            function getPropPartyList(Oappln) {

                dept_dataFactory.getUpExecutantList(Oappln).then(function (response) {

                    dept_sessionfactory.updateOnlineExecModal(response.data);
                    //console.log(response.data);
                    dept_dataFactory.getUpClaimantlist(Oappln).then(function (response) {
                        //update claimantlist modal session
                        dept_sessionfactory.updateOnlineClaimModal(response.data);
                        dept_dataFactory.getUpIdentifierlist(Oappln).then(function (response) {
                            //update Identiferlist modal session
                            dept_sessionfactory.updateOnlineIdentModal(response.data);
                            dept_dataFactory.getUpPropertyDetails(Oappln).then(function (response) {
                                dept_sessionfactory.updateOnlinePropModel(response.data);
                            });

                        });

                    });
                });
            }


        }]);
   
})();

(function () {
    angular.module('eSiroi.Web')
        .controller('upDeedController', ['$scope','$state','dept_sessionfactory','dataFactory','dept_dataFactory','deptModalService','modalService', function upDeedController($scope, $state, dept_sessionfactory, dataFactory, dept_dataFactory, deptModalService, modalService) {


            $scope.deed = deptModalService.deed;
            //$scope.d = deptModalService.deedddl;
            // $scope.d.dop = new Date();

            /// Fee exempt reason radion button action
            $scope.isExemptYes = function (yes) {

                return yes === $scope.deed.FeeExempt
            }
            $scope.ondeedSubmit = function () {

                $scope.deed.TSNo = deptModalService.onlineAppln.tsno;
                $scope.deed.TSYear = deptModalService.onlineAppln.tsyear
                $scope.deed.Date_Time_Present = $scope.d.dop + $scope.d.time;
                $scope.deed.transtype = deptModalService.onlineAppln.trans_code;
                $scope.deed.SR = parseInt( deptModalService.onlineAppln.sro);

                dept_dataFactory.postdeed($scope.deed).then(function (response) {
                    $state.go('department.content.updateform.property')
                }, function (result) {
                    alert('deed details sumbit fails');
                })
            }
        }
            
        ]);
    
})();
// upPropController
(function () {
    angular.module('eSiroi.Web')
        .controller('upPropertyController', ['$scope', '$state', 'dept_dataFactory', 'dept_sessionfactory', 'dataFactory', 'deptModalService', function upPropertyController($scope, $state, dept_dataFactory, dept_sessionfactory, dataFactory, deptModalService) {
            $scope.property = {};
            $scope.propertyList = [];
            $scope.PlotDetails = [];
            $scope.IsPlotFound = false;
            $scope.propertyList = angular.copy(dept_sessionfactory.getOnlinePropModel());
            console.log($scope.upPropForm.firstVisit);
            if ($scope.upPropForm.firstVisit) {
                //****** for multiple property******

                //for (var i = 0; i < $scope.propertyList.length; i++) {
                //    $scope.propslnolist.push($scope.propertyList[i].slNo);

                //********************************

                deptModalService.property = $scope.propertyList[0];
               
                $scope.upPropForm.firstVisit = false;
                //$scope.$on('$viewContentLoaded', function () {

                //    $scope.deptPropForm.$setDirty();
                //    // $scope.deptPropForm.$setValidity('required', true);
                //    // $scope.deptPropForm.$setValidity('error', true);
                //    console.log('propertyform: ' + $scope.deptPropForm.$dirty);
                //});
            }
            $scope.property = deptModalService.property;

            $scope.editProp = function () {
                $scope.upPropForm.fieldReadOnly = false;
            }
            $scope.editCancel = function () {
                $scope.propertyList = angular.copy(dept_sessionfactory.getOnlinePropModel());

                deptModalService.property = $scope.propertyList[0]
                $scope.property = deptModalService.property;

                $scope.upPropForm.fieldReadOnly = true;
            }

            $scope.next = function () {
                $state.go('department.content.updateform.executant')
            }
            $scope.onUpdate = function () {
                $state.go('department.content.updateform.executant')
            }
        }]);
    
})();
//upExecController
(function () {
    angular.module('eSiroi.Web')
        .controller('upExecController', ['$scope', '$state', 'deptModalService', 'dept_sessionfactory', function upExecController($scope, $state, deptModalService, dept_sessionfactory) {
            $scope.executant = {};

            $scope.executantlist = [];

            $scope.Elist = {}
            $scope.exForm = {};
            $scope.exForm.currSlno = 0;
            //$scope.exeslnolist = [];
            




            // ***To get online data ***
            $scope.executantlist = angular.copy(dept_sessionfactory.getOnlineExecModallist());
            console.log($scope.executantlist);
            console.log($scope.executantlist[0]);
            console.log($scope.upExecForm.firstVisit);
            if ($scope.upExecForm.firstVisit) {




                //  *** To be done *** Get Online Executantlist for first time

                for (var i = 0; i < $scope.executantlist.length; i++) {

                    $scope.upExecForm.exeslnolist.push($scope.executantlist[i].slNo);
                }

                deptModalService.executant = $scope.executantlist[0];
                console.log($scope.executantlist[0]);
                $scope.upExecForm.firstVisit = false;


            }


            // Injecting executant from Modal Service
            $scope.executant = deptModalService.executant;
            
           


            // initialize dropdownlist       
            init();
            function init() {
                $scope.success = false;


            }


            //******* ONLINE SELECT EXECUTANT LIST **********/
            $scope.getselectedExecutant = function () {
                

                var currSlno = $scope.Elist.slNo;
                deptModalService.executant = $scope.executantlist[currSlno - 1];
               
                $scope.executant = deptModalService.executant;
               
            }
            $scope.onEdit = function () {
                $scope.upExecForm.fieldReadOnly = false;

            }
            $scope.editCancel = function () {
                // claimant.slNo
                $scope.executantlist = angular.copy(dept_sessionfactory.getOnlineExecModallist());

                deptModalService.executant = $scope.executantlist[$scope.executant.slNo - 1]
                $scope.executant = deptModalService.executant;

                $scope.upExecForm.fieldReadOnly = true;
            }
            $scope.next = function () {
                $state.go('department.content.updateform.claimant')
            }
            $scope.onUpdate = function () {
                $state.go('department.content.updateform.claimant')
            }
        }]);
    
})();
//upClaimController
(function () {
    angular.module('eSiroi.Web')
        .controller('upClaimController', ['$scope', '$state', 'deptModalService', 'dept_sessionfactory', function upClaimController($scope, $state, deptModalService, dept_sessionfactory) {
            $scope.claimant = {};
            $scope.claimantlist = [];
            $scope.Clist = {}
            $scope.clForm = {};
            $scope.clForm.currSlno = 0;


            angular.copy(dept_sessionfactory.getOnlineClaimModallist(),$scope.claimantlist);
            if ($scope.upClaimForm.firstVisit) {
                //get claimantlist for online data

                for (var i = 0; i < $scope.claimantlist.length; i++) {

                    $scope.upClaimForm.claimslnolist.push($scope.claimantlist[i].slNo);
                }

                deptModalService.claimant = $scope.claimantlist[0];

                $scope.upClaimForm.firstVisit = false;

            }
            console.log($scope.claimantlist[0]);
            console.log(deptModalService.claimant);
            $scope.claimant = deptModalService.claimant;
            console.log($scope.claimant);
            //// inject default value of forms fields
            //if (!$scope.session.clFormIsOnline && $scope.session.clFormFistVisit) {
            //    // $scope.claim.state = $scope.states[21];
            //    $scope.claimant.slNo = $scope.clForm.currSlno + 1;
            //    $scope.clForm.currSlno = $scope.claimant.slNo;
            //    $scope.session.clFormFistVisit = false;

            //}

            // Claimant Online Slno change function
            $scope.getselectedClaimant = function () {
                var currSlno = $scope.Clist.slNo;
                deptModalService.claimant = $scope.claimantlist[currSlno - 1];
                $scope.claimant = deptModalService.claimant;
            }
            $scope.onEdit = function () {
                $scope.upClaimForm.fieldReadOnly = false;
                
            }
            $scope.editCancel = function () {
                // claimant.slNo
                angular.copy(dept_sessionfactory.getOnlineClaimModallist(),$scope.claimantlist);
                
                deptModalService.claimant = $scope.claimantlist[$scope.claimant.slNo - 1]
                console.log($scope.claimantlist[$scope.claimant.slNo - 1])
                $scope.claimant = deptModalService.claimant;

                $scope.upClaimForm.fieldReadOnly = true;
            }
            $scope.next = function () {
                $state.go('department.content.updateform.identifier')
            }
            $scope.onUpdate = function () {
                $state.go('department.content.updateform.identifier')
            }
        }]);
    
})();
//upIdentifierController
(function () {
    angular.module('eSiroi.Web')
        .controller('upIdentController', ['$scope', '$state', 'deptModalService', 'dept_sessionfactory', 'dept_dataFactory', function upIdentController($scope, $state, deptModalService, dept_sessionfactory, dept_dataFactory) {
            $scope.identifier = {};
            $scope.identifierlist = [];
            $scope.Ilist = {};
            $scope.idForm = {};
            $scope.idForm.currSlno = 0;

           // $scope.identifierlist = dept_sessionfactory.getOnlineIdentModallist();
            angular.copy(dept_sessionfactory.getOnlineIdentModallist(), $scope.identifierlist);
            if ($scope.upIdentForm.firstVisit) {
                //get claimantlist for online data

                for (var i = 0; i < $scope.identifierlist.length; i++) {

                    $scope.upIdentForm.identslnolist.push($scope.identifierlist[i].slNo);
                }

                deptModalService.identifier = $scope.identifierlist[0];

                //deptModalService.ident = $scope.identddlist[0];
                //console.log(deptModalService.ident);
                $scope.upIdentForm.firstVisit = false;

            }
            $scope.identifier = deptModalService.identifier;

            //// inject default value
            //if (!$scope.session.idFormIsOnline && $scope.session.idFormFirstVisit) {
            //    $scope.identifier.slNo = $scope.idForm.currSlno + 1;
            //    $scope.idForm.currSlno = $scope.identifier.slNo;
            //    // $scope.ident.state = $scope.states[21];
            //}

            $scope.getselectedIdentifier = function () {
                var currSlno = $scope.Ilist.slNo;
                deptModalService.identifier = $scope.identifierlist[currSlno - 1];
                //deptModalService.ident = $scope.identddlist[currSlno - 1];
                $scope.identifier = deptModalService.identifier;
                //$scope.ident = deptModalService.ident;
            }
            $scope.onEdit = function () {
                $scope.upIdentForm.fieldReadOnly = false;

            }
            $scope.editCancel = function () {
               
                angular.copy(dept_sessionfactory.getOnlineIdentModallist(), $scope.identifierlist);

                deptModalService.identifier = $scope.identifierlist[$scope.identifier.slNo - 1]
                //console.log($scope.claimantlist[$scope.claimant.slNo - 1])
                $scope.identifier = deptModalService.identifier;

                $scope.upIdentForm.fieldReadOnly = true;
            }
            $scope.next = function () {
                
                var statusobject = {}
                angular.extend(statusobject, {
                    ackno: deptModalService.onlineAppln.ackno,
                    sro: deptModalService.onlineAppln.sro,
                    tsno: deptModalService.onlineAppln.tsno,
                    tsyear: deptModalService.onlineAppln.tsyear,
                    status: 'DeedEntered',
                    remarks: ''
                })
                dept_dataFactory.updateApplicationStatus(statusobject).then(function (result) {
                    $state.go('department.content.upload');
                },
                function (error) {
                    alert('Update submission fail');
                })
            }
            $scope.onUpdate = function () {
                //* TO DO UPDATE THE PROPERTY PARTY DETAILS */
                var statusobject = {}
                angular.extend(statusobject, {
                    ackno: deptModalService.onlineAppln.ackno,
                    sro: deptModalService.onlineAppln.sro,
                    tsno: deptModalService.onlineAppln.ts,
                    tsyear: deptModalService.onlineAppln.tsyear,
                    
                    status: 'DeedEntered',
                    remarks: ''
                })
                dept_dataFactory.updateApplicationStatus(statusobject).then(function (result) {
                    $state.go('department.content.upload');
                },
                function (error) {
                    alert('Update submission fail');
                })
                
            }

        }]);
    
})();