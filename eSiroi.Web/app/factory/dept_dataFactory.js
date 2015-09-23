(function () {
    'use strict';

    angular
        .module('eSiroi.Web')
        .factory('dept_dataFactory', ['$http','eSiroiWebSettings', dept_dataFactory]);

    function dept_dataFactory($http, eSiroiWebSettings) {
        var urlBase = eSiroiWebSettings.apiResrcServiceBaseUri + 'api/ApplyRegistrationController/';
        var urlBase2 = eSiroiWebSettings.apiResrcServiceBaseUri +'api/deptRegistraionController/';
        var urlBase3 = eSiroiWebSettings.apiResrcServiceBaseUri + 'api/OnlineUpdate/';
        var urlBase4 = eSiroiWebSettings.apiResrcServiceBaseUri + 'api/SRController/';
        var service = {

            /// GET ONLINE APPLICATION
            getOnlAppln: function(status){
                return $http({
                    method: 'GET',
                    url: urlBase2 + status + '/getAppln'
                });
            },


            //#region DEED FORM DATA FACTORY

            // GET DEED STATUS
            getApplication: function (status) {
                return $http({
                    method:'GET',
                    url: urlBase2 + status + '/getApplication'
                });
            },

            //POST DEED DETAILS
            postdeed:function(deed){
                return $http({
                    method: 'POST',
                    data: deed,
                    url: urlBase2 + 'postdeed'
                })
            },

            /// GET EXEMPT REASON LIST
            getExempReason: function(){
                return $http({
                    method: 'GET',
                    url: urlBase2 + '/ExemptReason',
                    cache: true
                });
            },
            //#endregion
            //#region PROPERTY FORM DATA FACTORY
            getPropertyDetail: function(ackno){
                return $http({
                    method: 'GET',
                    url: urlBase2 + ackno + '/property'
                });
            },

            getPropertyddl: function(ackno){
                return $http({
                    method:'GET',
                    url: urlBase2 + ackno + '/propertyddl'
                });
            },

            // get landclass api
            getLandClass: function () {
                return $http({
                    method: 'GET',
                    url: urlBase2 + '/landclass',
                    cache: true
                })
            },
            // get LandType api
            getLandType: function () {
                return $http({
                    method: 'GET',
                    url: urlBase2 + '/landtype',
                    cache: true
                })
            },

            postPlotDetail:function(plot){
                return $http({
                    method:'POST',
                    url: urlBase2 + '/postPlotDetail',
                    data: plot
                })
            },
            //#endregion


           
            //#region EXECUTANTFROM
            // EXECUTANT FORM DATA FACTORY

            getOnlineExecutantList: function (ackno) {
                return $http({
                    method: 'GET',
                    url: urlBase2 + ackno + '/excutantlist '
                });
            },

            
            getOnlineExecddlist: function (ackno) {
            return $http({
                method: 'GET',
                url: urlBase2 + ackno + '/execddllist'
            });
            },

            postdeptexecutantlist: function (executantlist) {
                return $http({
                    method: 'POST',
                    data: executantlist,
                    url: urlBase2 + 'postexecutant'

                });
            },
            //#endregion EXECUTANTFROM
            //#region CLAIMANTFORM
            // CLAIMANT FORM DATAFACTORY

            getOnlineClaimantlist: function (ackno) {
            return $http({
                method: 'GET',
                url: urlBase2 + ackno + '/claimantlist '
            });
            },

            getclaimddlist: function (ackno) {
                return $http({
                    method: 'GET',
                    url: urlBase2 + ackno + '/claimddlist '
                });
            },
            postClaimantList: function(claimantList){
                return $http({
                    method: 'POST',
                    url: urlBase2 + 'postClaimant',
                    data:claimantList

                })
              
            },
            //#endregion 
            //#region IDENTIFIERFORM
            // IDENTIFIER FORM DATAFACTORY

            getOnlineIdentifierlist: function (ackno) {
                return $http({
                    method: 'GET',
                    url: urlBase2 + ackno + '/identifierlist'
                })
            },

            getOnlineIdentddlist: function (ackno) {
            return $http({
                method: 'GET',
                url: urlBase2 + ackno + '/identddllist'
            })
            },
            postIdentifierList: function (identifierList) {
                return $http({
                    method: 'POST',
                    url: urlBase2 + 'postIdentifier',
                    data:identifierList
                })
            },
            //update Deed Status
            updateDeedStatus: function (statusObject) {
            return $http({
                method: 'POST',
                url: urlBase2 + 'updateDeedStatus',
                data:statusObject
                })
            },
            //SR approve applicaiton
            approveApplication: function () {
                return $http({
                    method: 'POST',
                    url: urlBase2 + 'approvedApplication'
                    //data: {
                    //    ts: ts,
                    //    tyear:tyear,
                    //}
                })
            },
            //#endregion

            //#region DEPARTMENTHOME
            getDeedInfo:function(tsno,tsyear){
                return $http({
                    method: 'GET',
                    url: urlBase2 + tsno + '/'+ tsyear + '/deedinfo'
                })
            },

            getPropertyInfo:function(tsno,tsyear){
                return $http({
                    method: 'GET',
                    url: urlBase2 + tsno + '/'+ tsyear + '/propertyinfo'
                })
            },
            getExecInfo: function(tsno,tsyear){
                return $http({
                    method: 'GET',
                    url: urlBase2 + tsno + '/' + tsyear + '/executantInfo'
                })
            },
            getClaimInfo: function (tsno, tsyear) {
                return $http({
                    method: 'GET',
                    url: urlBase2 + tsno + '/' + tsyear + '/claimantInfo'
                })
            },
            getIdentInfo: function(tsno,tsyear){
                return $http({
                    method: 'GET',
                    url: urlBase2 + tsno + '/' + tsyear + '/identifierInfo'
                })
            },
            //#endregion 
            //#region APPLICATION
            updateApplicationStatus: function (Application) {
                return $http({
                    method: 'POST',
                    url: urlBase2 + 'updateApplication',
                    data: Application
                });
            },
            addApplication: function (Application) {
            return $http({
                method: 'POST',
                url: urlBase2 + 'applicationAdd',
                data: Application
            });
            },

            fillAppln: function (){
                return $http({

                });
            },
            fillOnlineAppln: function () {
                return $http({

                });
            },

            generateTsID: function (sro) {
                return $http({
                    method: 'POST',
                    url: urlBase2 + 'generateTS',
                    data: sro
                })
            },

            //#endregion 

            getDate:function(){
                return $http({
                    method:'GET',
                    url: urlBase2 + 'getDate'

                })
            },
            postAppointment: function (appnObject) {
                return $http({
                    method: 'POST',
                    url: urlBase2 + 'postDate',
                    data: appnObject

                })
            },

            //#region UPDATE
            getOnlineData: function (ackno) {
                return $http({
                    method: 'POST',
                    url: urlBase2 + 'getOnlineData',
                    data: ackno
                })
            },
            getUpExecutantList: function (Oappln) {
                return $http({
                    method: 'POST',
                    url: urlBase3 + 'getExecutantlist',
                    data:Oappln
                })
            },
            getUpClaimantlist: function (Oappln) {
                return $http({
                    method: 'POST',
                    url: urlBase3 + 'getClaimantlist',
                    data: Oappln
                })
            },
            getUpIdentifierlist: function (Oappln) {
                return $http({
                    method: 'POST',
                    url: urlBase3 + 'getIdentifierlist',
                    data: Oappln
                })
            },
            
            getUpPropertyDetails: function (Oappln) {
                return $http({
                    method: 'POST',
                    url: urlBase3 + 'getProperty',
                    data: Oappln
                })
            },
            uploadcomplete: function(Uappln){
                return $http({
                    method:'POST',
                    url: urlBase3+'uploadComplete',
                    data:Uappln
                })
        },
            //#endregion

            //#region SRFACTORY
            finalizeAppln: function (appln) {
                return $http({
                    method: 'POST',
                    url: urlBase4 + 'finalizeApplication',
                    data: appln
                })
            }
            //#endregion 


        };

        return service;

        
    }
    angular.module('eSiroi.Web').config(['errorHandlerProvider','$provide',function (errorHandlerProvider, $provide) {

        errorHandlerProvider.decorate($provide, ['dept_dataFactory'])
    }]);
})();


