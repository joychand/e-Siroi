(function () {
    'use strict';

    angular
        .module('app')
        .controller('controller2', ['$location', controller2]);

    function controller2($location) {
        var vm = this;
        vm.title = 'controller2';

        activate();

        function activate() { }
    }
})();
