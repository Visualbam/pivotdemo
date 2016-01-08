(function () {
    'use strict';

    angular
        .module('app')
        .controller('BoardsController', BoardsController);

    BoardsController.$inject = ['pivotTrakerService'];

    function BoardsController(pivotTrakerService) {
        var vm = this,
            data;

        // interface
        vm.title = '';
        vm.email = '';

        // controller logic
        init();

        function init() {
            return getProfile();
        }

        function getProfile() {
            return pivotTrakerService.getProfile()
                .then(function(data) {
                    console.log(data);
                    vm.title = data.data.name;
                });
        }

        function getProject() {
            return pivotTrakerService.getProject()
                .then(function(data) {
                    vm.title = data.data.name;
                });
        }
    }
})();