(function () {
    'use strict';

    angular
        .module('app')
        .controller('BoardsController', BoardsController);

    BoardsController.$inject = ['pivotTrakerService'];

    function BoardsController(pivotTrakerService) {
        var vm = this;

        vm.getProfile = getProfile();
        vm.title = 'Avengers';

        function getProfile() {
            return pivotTrakerService.getProfile(function(data) {
                console.log(data.email);
                vm.title = data.email;
            });
        }
    }
})();