(function () {
    'use strict';

    angular
        .module('app.boards')
        .controller('Boards', Boards);

    Boards.$inject = [];

    function Boards() {
        var vm = this;
        vm.title = 'Avengers';
    }
})();