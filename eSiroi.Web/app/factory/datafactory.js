/// <reference path = ~/scripts/angular.js />

/// <reference path = ~/scripts/app/controller/registrationController.js>

angular.module('eSiroi.Web')
    .factory('dataFactory', ['$http', 'eSiroiWebSettings', function ($http,eSiroiWebSettings) {

        var urlBase = eSiroiWebSettings.apiResrcServiceBaseUri + 'api/Districts';
        var urlBase2 = eSiroiWebSettings.apiResrcServiceBaseUri + 'api/SubDivisions';
        var urlBase3 = eSiroiWebSettings.apiResrcServiceBaseUri + 'api/ApplyRegistrationController/';
        var urlBase4 = eSiroiWebSettings.apiResrcServiceBaseUri + 'api/OnlineExecutants';
        var urlBase5 = eSiroiWebSettings.apiResrcServiceBaseUri + 'api/ComDataController/';
        var urlBase6 = eSiroiWebSettings.apiAuthServiceBaseUri + 'api/accounts/';
        var urlBase7 = eSiroiWebSettings.apiResrcServiceBaseUri + 'api/Public/';
        var dataFactory = {};
        var ackno = 0

        dataFactory.getSRO = function () {
            return $http({
                method: 'GET',
                url: urlBase3 + 'getSRO',
                cache: true
            })
        }
       
        dataFactory.getSroName = function (srocode) {
            return $http({
                method: 'GET',
                url: urlBase3 + srocode + '/getSroName'
            }).then(function (response) {
                return response.data;
            });
        }
        dataFactory.getTransName = function (maj_code) {
            return $http({
                method: 'GET',
                url: urlBase3 + maj_code + '/trans_name'
            }).then(function (results) {
               
                return results.data;
            });
        }

        dataFactory.getDistricts = function () {
            return $http.get(urlBase).then(function (results) {
                return results.data;
            });
        };
        dataFactory.getAckno = function () {
            ackno = ackno + 1;
            return ackno;

        }
        dataFactory.getSubDivisions = function () {
            return $http({
                method: 'GET',
                url: urlBase3 + 'subdivisions',
                cache: true
            }).then(function (results) {
                return results.data;

            });
        };
        dataFactory.getRevSubDivisions = function () {
            return $http({
                method: 'GET',
                url: urlBase3 + 'Revsubdivision',
                cache: true
            }).then(function (result) {
                return result.data;
            });
        }

        dataFactory.getStates = function () {
            return $http({
                method: 'GET',
                url: urlBase3 + 'state',
                cache: true
            }).then(function (results) {
                return results.data;

            });
        };

       

        dataFactory.getVillages = function () {
            return $http({
                method: 'GET',
                url: urlBase3 + 'villages',
                cache: true
            }).then(function (results) {
                return results.data;

            });
        };
        dataFactory.getMajortransaction = function () {
            return $http({
                method: 'GET',
                url: urlBase3 + 'MajorTrans_code',
                cache: true
            });
        };
        dataFactory.getCircle = function () {
            return $http({
                method: 'GET',
                url: urlBase3 + 'Circle',
                cache: true
            }).then(function (results) {
                return results.data;

            });
        };
        dataFactory.getRevVillage = function () {
            return $http({
                method: 'GET',
                url: urlBase3 + 'RevVillage',
                cache: true
            }).then(function (results) {
                return results.data;

            });
        };
        dataFactory.getPoliceStations = function () {
            return $http({
                method: 'GET',
                url: urlBase5 + 'getPoliceStations',
                cache: true
            }).then(function (results) {
                return results.data;

            });
        };
        dataFactory.getPostOffices = function () {
            return $http({
                method: 'GET',
                url: urlBase3 + 'postoffices',
                cache: true
            }).then(function (results) {
                return results.data;

            });
        };
        dataFactory.getOccupation = function () {
            return $http({
                method: 'GET',
                url: urlBase5 + 'getOccupations',
                cache: true
            });
        }
        // post onlineApplication
        dataFactory.postonlineapplication = function (onlineapplication) {
            return $http({
                method: 'POST',
                url: urlBase3 + 'postapplication',
                data: onlineapplication
            });//.then(function (results) { return results.data; });
        }

        // UPDATE ONLINEAPPLICATION STATUS

        dataFactory.updateApplnStatus=function(ackno){
            return $http({
                method: 'POST',
                url: urlBase3 + 'updateAppln',
                data: ackno,
                datatype: 'json'
            });
        }

        //post executant

        dataFactory.postexecutant = function (executantList) {
            return $http({
                method:'POST',
                url: urlBase3 +'postexecutant',
                data: executantList
                });
        };

        // post claimant
        dataFactory.postclaimant = function (claimantList) {
            return $http({
                method: 'POST',
                url: urlBase3 +'postclaimant',
                data: claimantList
            });
            
        };

        // post Identifier
        dataFactory.postidentifier = function (identifierList) {
            return $http({
                method: 'POST',
                url: urlBase3 + 'postidentifier',
                data: identifierList
            });
            
        };

   
        //post property
        dataFactory.postProperty = function (plot) {
            return $http({
                method: 'POST',
                url: urlBase3 + 'postplot',
                data: plot
            })
        };

        dataFactory.signUpUsr = function (usrModel) {
            return $http({
                method: 'POST',
                url: urlBase6 + 'signup',
                data: usrModel
            })
        };
        dataFactory.getOnlineApplnStatus = function (ackno) {

            return $http({
                method: 'GET',
                url: urlBase7 + ackno + '/applnStatus'
            })
        };
        dataFactory.getAckn = function (applnID) {
            return $http({
                method: 'POST',
                url: urlBase7 + 'getAckn',
                data:applnID
            })
        }
        // Add each service function description for error handler service
        dataFactory.getSRO.description = 'GetSro';
        dataFactory.getTransName.description = 'getTransName';
        dataFactory.getSroName.description = 'getSroName';
        dataFactory.getDistricts.description = 'getDistricts';
        dataFactory.getRevSubDivisions.description = 'getRevSubDivisions';
        dataFactory.postonlineapplication.description = 'postonlineapplication';
        return dataFactory;
    }]);

angular.module('eSiroi.Web').config(['errorHandlerProvider', '$provide', function (errorHandlerProvider, $provide) {

     errorHandlerProvider.decorate($provide, ['dataFactory'])
 }]);

