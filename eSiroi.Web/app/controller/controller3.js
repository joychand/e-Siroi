(function () {
    'use strict';

    angular
        .module('app')
        .controller('controller3', ['$location', controller3]);

    function controller3($location) {
        var vm = this;
        vm.title = 'controller3';

        activate();

        function activate() { }
    }
})();
