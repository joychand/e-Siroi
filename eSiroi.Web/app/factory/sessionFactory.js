
    angular
        .module('eRegApp')
        .factory('sessionFactory', ['$http', '$rootScope', '$q','$timeout' ,function ($http, $rootScope, $q,$timeout) {
    
            var sessionFactory = {};
            var data = 'dfdfdfd';
            var transaction;
            var sro;
            var loginid;
            var urlBase3 = 'api/ApplyRegistrationController/'
            var applicationList = [];
            var propertyList = [];
            var executantList = [];
            var claimantList = [];
            var identifierList = [];
            var statis = false;
            var currAckno;
           

             
            sessionFactory.getData = function () {
                
                return data;
            };

            sessionFactory.getTransName = function () {
                //return transaction.transName ;
                return transaction;

            };

            sessionFactory.putTransName = function (transName) {
                //transaction.transName = transName;
                transaction = transName;
            }
            sessionFactory.getSro = function () {
                return sro;
            }

            sessionFactory.putSro = function (transro) {
                sro = transro;

            }
            sessionFactory.getAckno = function (sro) {


                //var deffered = $q.defer();
               return $http({
                    method: 'GET',
                    url: urlBase3 + sro + '/ackno'
                })
                //.success(function (result) {
                   
                //    deffered.resolve(result.data);
                   
                //    //    //console.log(success.data[0]);
                //    //    // return result.data[0];
                //    // });
                //    return deffered.promise;
                //    // callback(result);
                //})
            };

            sessionFactory.pushApplication = function (application) {
                var deffered = $q.defer();
                if (status = false) {
                    applicationList.push(application);
                    status = true;
                    deffered.reslove(status);
                }
                return deffered.promise;
            }

            sessionFactory.popApplicaton = function () {
                return applicationList[0];

            }
            // push propertyDetails
            sessionFactory.pushProperty = function (property) {
                propertyList.push(property);
            }

            // get PropertyDetails
            sessionFactory.getProperty = function () {
                return propertyList;
            }
            
            //getCurrent Ackno

            sessionFactory.getCurrAckno = function () {
                return currAckno;

            }

            //putCurrent Ackno
            sessionFactory.putCurrAckno = function (ackno) {
                currAckno = ackno;
            }

            // push Executant
            sessionFactory.pushExecutant = function (executant) {

                executantList.push(executant);
            }

            // get ExecutantList
            sessionFactory.getExecutantList = function () {
                return executantList;
            }

            // push Claimant
            sessionFactory.pushClaimant = function (claimant) {
                claimantList.push(claimant);

            }

            // get ClaimantList            
            sessionFactory.getClaimantList = function () {
                return claimantList;

                }            
            // push Identifier
            sessionFactory.pushIdentifier = function (identifier) {
                identifierList.push(identifier)
            }


            //get IdentifierList            
             sessionFactory.getIdentifierList = function () {
                 return identifierList;
                }
            //CLEAR SESSIONCOLLECTION LIST

             sessionFactory.clearSession = function () {
                  propertyList = [];
                  executantList = [];
                  claimantList = [];
                 identifierList = [];
             }
            ////$rootScope.$on("savestate", service.SaveState);
                ////$rootScope.$on("restorestate", service.RestoreState);
                return sessionFactory;
           

                //sessionFactory.putLinksSelected = function (identifier) {
                //    identifierList.push(identifier)
                //}
        }]);

    angular
       .module('eRegApp').factory("errors", function ($rootScope) {
        return {
            catch: function (message) {
                return function (reason) {
                    $rootScope.addError({ message: message, reason: reason })
                };
            }
        };
    });

