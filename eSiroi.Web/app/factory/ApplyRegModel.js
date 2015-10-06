(function () {
    angular
   .module('eSiroi.Web')
   .factory('ApplyRegModel',['$http', ApplyRegModel]);
    function ApplyRegModel($http) {

        var model = {
            //application model
            onlineapplication: {},

            transName: '',
            sroName: '',
            clearmodel: function () {
                this.sroName = '';
                this.transName = '';
                this.onlineapplication = {};
            }
        }
        return model;
    }
})();