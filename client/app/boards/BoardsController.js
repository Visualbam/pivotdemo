(function () {
    'use strict';

    angular
        .module('app')
        .controller('BoardsController', BoardsController);

    BoardsController.$inject = ['pivotTrakerService'];

    function BoardsController(pivotTrakerService) {
        var vm = this;;

        // interface
        vm.title = '';
        vm.models = {
            selected: null,
            boards: {
                working: [],
                done: [],
                backlog: []
            }
        };

        vm.sortStory = function () { 
            console.log('hello tits');
        }

        pivotTrakerService.profile.get(function (data) {
            vm.title = data.email;
        });

        pivotTrakerService.stories.query(function (data) {
            angular.forEach(data, function (story) {
                if (story.current_state === 'unstarted') {
                    vm.models.boards.backlog.push(story);
                }

                if (story.current_state === 'started' || story.current_state === 'finished' || story.current_state === 'delivered') {
                    vm.models.boards.working.push(story);
                }

                if (story.current_state === 'accepted') {
                    vm.models.boards.done.push(story);
                }
            });
        });
        
        return vm;
    }
})();