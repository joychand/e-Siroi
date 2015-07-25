/// <reference path = ~/scripts/angular.js />

/// <reference path = ~/scripts/app/controller/registrationController.js>

angular.module('eSiroi.Web')
    .factory('dataFactory', ['$http', function ($http) {

        var urlBase = '/api/Districts';
        var urlBase2 = '/api/SubDivisions';
        var urlBase3 = '/api/ApplyRegistrationController/';
        var urlBase4 = 'api/OnlineExecutants';
        var urlBase5 = 'api/ComDataController/'
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
                url: 'api/ApplyRegistrationController/postexecutant',
                data: executantList
                });
        };

        // post claimant
        dataFactory.postclaimant = function (claimantList) {
            return $http({
                method: 'POST',
                url: 'api/ApplyRegistrationController/postclaimant',
                data: claimantList
            });
            
        };

        // post Identifier
        dataFactory.postidentifier = function (identifierList) {
            return $http({
                method: 'POST',
                url: 'api/ApplyRegistrationController/postidentifier',
                data: identifierList
            });
            
        };

   
        //post property
        dataFactory.postProperty = function (plot) {
            return $http({
                method: 'POST',
                url: 'api/ApplyRegistraionController/postplot',
                data:plot
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

 angular.module('eSiroi.Web').config(function (errorHandlerProvider, $provide) {

     errorHandlerProvider.decorate($provide, ['dataFactory'])
 });

