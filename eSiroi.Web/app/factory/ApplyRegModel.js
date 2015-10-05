(function () {
    angular
   .module('eSiroi.Web')
   .factory('ApplyRegModel',['$http', ApplyRegModel]);
    function ApplyRegModel($http) {

        var model = {
            //application model
            onlineapplication: {},

            transName: '',
            sroName: ''

        }
        return model;
    }
})();