(function () {
    angular
   .module('eSiroi.Web')
   .factory('ApplyRegModel',['dataFactory', ApplyRegModel]);
    function ApplyRegModel(dataFactory) {

        var model = {
            //application model
            onlineapplication: {},

            transName: '',
            sroName: ''

        }
        return model;
    }
})();