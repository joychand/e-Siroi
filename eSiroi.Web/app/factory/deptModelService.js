(function () {
    'use strict';

    angular
        .module('eSiroi.Web')
        .factory('deptModalService', ['$http', deptModalService]);

    function deptModalService($http) {
        var executantList = [1, 2, 3, 4, 5];
        var model = {
            // executant Model
            executant: {},
            execddl: {},
            //claimant model
            claimant: {},
            claim: {},
            // identifier model
            identifier: {},
            ident: {},
            //property model
            property: {},
            propertyddl: {},
            //deed Model
            deed: {},
            deedddl: {},

           ApplnModel:{},

            modelClear: function () {

                this.executant = {};
                this.execddl = {};
                this.claimant = {};
                this.claim = {};
                this.identifier = {};
                this.ident = {};
                this.deed = {};
                this.deedddl = {};
                this.property = {};
                this.propertyddl = {};

            },
            clFormOnline: {
                status: '',
                ddlview: '',
                slnoddlVisibility: '',
               },
            
            idFormOnline:{
                status:'',
                ddlview: '',
                slnoddlVisibility:'',
            },
            getlist: function() {
                return executantList;
            },

            

           

        }
        return model;
        }

    
})();