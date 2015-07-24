(function () {
    angular
   .module('eRegApp')
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