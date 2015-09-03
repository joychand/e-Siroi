(function () {
    'use strict';

    angular
        .module('eSiroi.Web')
        .factory('dept_sessionfactory', ['$http', dept_sessionfactory]);

    function dept_sessionfactory($http) {
        var service = {};
        var linksVisibility;
        var Online = false;
        var execOnline = false;
        var sessionpropertylist = [];
        var sessionpropertyddl = [];
        var sessionexecutantlist = [];
        var sessionexecddlist = [];
        var sessionclaimantlist = [];
        var sessionclaimddlist = [];
        var sessionidentifierlist = [];
        var sessionidentddlist = [];
        var sessionAckno = 0;
        var sessionSro;

        var executantlist = [];
        var claimantlist = [];
        var identifierlist = [];
        //USER PROFILE
        service.user = {};
        service.putAckno = function (ackno) {
            
            sessionAckno = ackno;
        }

        service.getAckno = function () {
          
                return sessionAckno;
        }
        service.putSro = function (sroCode) {
            sessionSro = sroCode;
        }
        service.getSro = function () {
            return sessionSro;
        }
        service.getLinkVisibility = function () {
            return linkVisibilty;
        }

        service.dEntryOffVisible = function () {
            linksVisibility = false;
        }
        
        service.dEntryOnVisible = function () {
            linksVisibility = true;
        }

        service.getOnline=function(){

            return Online;


        }
        service.getExecOnline = function () {
            return execOnline;
        }

        service.putOnline = function () {
            Online = true;
            execOnline = true;
        }

        service.updateExecOnline = function () {
            execOnline = false;
        }

       
        // DEPT APPLICATION LIST VARIABLES
        var rowData = {};
        var FromStatus = 'New';
        service.updateFormStatus=function(status){
            FromStatus=status;
        }
        service.putRow = function (row) {
            rowData = row;
        }
        service.getRow = function () {
            return rowData;
        }
        // PROPERTY SESSION MODEL LIST

        service.updateOnlinePropModel = function (property) {
            sessionpropertylist = property;
        }
        service.getOnlinePropModel = function () {
            return sessionpropertylist;
        }
        service.updateOnlinePropddlModel = function (propertyddl) {
            sessionpropertyddl = propertyddl;
        }
        service.getOnlinePropddlModel = function () {
            return sessionpropertyddl;
        }

        // EXECUTANT SESSION MODEL LIST
        
        service.updateOnlineExecModal = function (executantlist) {
            sessionexecutantlist = [];
            sessionexecutantlist = executantlist;
            //console.log('service' + sessionexecutantlist[0].ackno);
        }
        
        service.getOnlineExecModallist = function () {
           
            return sessionexecutantlist;
        }

        service.updateOnlineExecddllModal = function (execddlist) {
            sessionexecddlist = [];
            sessionexecddlist = execddlist;
        }

        service.getOnlineExecddlModallist = function () {

            return sessionexecddlist;
        }

        service.pushExecutant = function (executant) {
            executantlist.push(executant);
            console.log(executantlist[0]);
        }

        service.getExecutantlist = function () {
            //console.log(executantlist);
            return executantlist;
        }
        service.putOnlineExecutantlist = function (onlineExecutantlist) {
            executantlist = [];
            executantlist = onlineExecutantlist;
        }

        // CLAIMANT LIST

        service.updateOnlineClaimModal = function (claimlist) {
            sessionclaimantlist = [];
            sessionclaimantlist = claimlist;
            
        }

        service.getOnlineClaimModallist = function () {

            return sessionclaimantlist;
        }

        service.updateOnlineClaimddlModal = function (claimddlist) {
            sessionclaimddlist = [];
            sessionclaimddlist = claimddlist;
        }

        service.getOnlineCalimddlModal = function () {
            return sessionclaimddlist;
        }
        service.pushClaimant = function (claimant) {
            claimantlist.push(claimant);
        }
        service.getClaimantlist = function () {
            return claimantlist
        }
        service.putOnlineClaimantlist = function (onlineClaimantlist) {
            claimantlist = [];
            claimantlist = onlineClaimantlist;
        }
        //Identifier List

        service.updateOnlineIdentModal = function (identlist) {
            sessionidentifierlist = [];
            sessionidentifierlist = identlist;
            
        }

        service.getOnlineIdentModallist = function () {

            return sessionidentifierlist;
        }

        service.updateOnlineIdentddlModal = function (Identddlist) {
            sessionidentddlist = [];
            sessionidentddlist = Identddlist;
        }

        service.getOnlineIdentddlModal = function () {
            return sessionidentddlist;
        }
        service.pushIdentifier = function (identifier) {
            identifierlist.push(identifier);

        }
        service.getIdentifierList = function () {
            return identifierlist;
        }
        service.putOnlineIdentifierList = function (onlineIdentifierlist) {
            identifierlist = [];
            identifierlist = onlineIdentifierlist;

        }
        //clear session values
        service.clearModelList = function () {
             sessionexecutantlist = [];
             sessionexecddlist = [];
             sessionclaimantlist = [];
             sessionclaimddlist = [];
             sessionidentifierlist = [];
             sessionidentddlist = [];
             executantlist = [];
             claimantlist = [];
             identifierlist = [];
        }

        //LOGIN MODAL SERVICE
        var currUser;
        service.putCurrUser = function (User) {
            currUser = User;

        }
        service.getCurrUser = function () {
            return currUser;
        }
        return service;

        //function getData() { }
    }
})();