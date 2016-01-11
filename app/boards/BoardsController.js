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
        vm.stories = [];

        pivotTrakerService.profile.get(function (data) {
            vm.title = data.email;
        });

        pivotTrakerService.stories.query(function (data) {
            vm.stories = data;
        });
    }
})();