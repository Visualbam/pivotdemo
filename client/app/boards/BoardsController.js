(function () {
    'use strict';

    angular
        .module('app')
        .controller('BoardsController', BoardsController);

    BoardsController.$inject = ['pivotTrakerService'];

    function BoardsController(pivotTrakerService) {
        var vm = this,
            data,
            createBoard,
            backlog,
            working,
            done;

        // interface
        vm.title = '';
        vm.boards = [];

        createBoard = function (name) {
            return {
                title: name,
                stories: []
            };
        };

        backlog = createBoard('backlog');
        working = createBoard('working');
        done = createBoard('done');

        vm.boards.push(done, working, backlog);

        pivotTrakerService.profile.get(function (data) {
            vm.title = data.email;
        });

        pivotTrakerService.stories.query(function (data) {
            angular.forEach(data, function (story) {
                if (story.current_state === 'unstarted') {
                    backlog.stories.push(story);
                }

                if (story.current_state === 'started' || story.current_state === 'finished' || story.current_state === 'delivered') {
                    working.stories.push(story);
                }

                if (story.current_state === 'accepted') {
                    done.stories.push(story);
                }
            });
        });
    }
})();