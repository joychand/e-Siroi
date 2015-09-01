(function () {
    'use strict';

    angular
        .module('eSiroi.Web')
        .factory('dept_dataFactory', ['$http','eSiroiWebSettings', dept_dataFactory]);

    function dept_dataFactory($http, eSiroiWebSettings) {
        var urlBase = eSiroiWebSettings.apiResrcServiceBaseUri + 'api/ApplyRegistrationController/';
        var urlBase2 = eSiroiWebSettings.apiResrcServiceBaseUri +'api/deptRegistraionController/';
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
            getDeed: function(status){
                return $http({
                    method:'GET',
                    url:urlBase2 + status + '/getDeed'
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
            }
           

        };

        return service;

        
    }
    angular.module('eSiroi.Web').config(function (errorHandlerProvider, $provide) {

        errorHandlerProvider.decorate($provide, ['dept_dataFactory'])
    });
})();


