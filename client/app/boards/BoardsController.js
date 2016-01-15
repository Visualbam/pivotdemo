(function () {
    'use strict';

    angular
        .module('app')
        .controller('BoardsController', BoardsController);

    BoardsController.$inject = ['pivotTrakerService', '$scope'];

    function BoardsController(pivotTrakerService, $scope) {
        $scope.models = {
            selected: null,
            boards: {
                backlog: [],
                working: [],
                done: []
            }
        };

        $scope.updateStatus = function (storyId, event) {
            var story = pivotTrakerService.story.get({ id: storyId });
            console.log(event);
        };

        pivotTrakerService.stories.query(function (data) {
            angular.forEach(data, function (story) {
                if (story.current_state === 'unstarted') {
                    $scope.models.boards.backlog.push(story);
                }

                if (story.current_state === 'started' || story.current_state === 'finished' || story.current_state === 'delivered') {
                    $scope.models.boards.working.push(story);
                }

                if (story.current_state === 'accepted') {
                    $scope.models.boards.done.push(story);
                }
            });
        });
    }
})();