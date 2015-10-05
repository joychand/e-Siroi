(function () {
    angular
   .module('eSiroi.Web')
   .factory('ApplyRegModel',[ ApplyRegModel]);
    function ApplyRegModel() {

        var model = {
            //application model
            onlineapplication: {},

            transName: '',
            sroName: ''

        }
        return model;
    }
})();