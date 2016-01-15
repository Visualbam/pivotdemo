(function () {
    'use strict';

    angular
        .module('app')
        .controller('BoardsController', BoardsController);

    BoardsController.$inject = ['pivotTrakerService', '$scope'];

    function BoardsController(pivotTrakerService, $scope) {
        var storyId;

        $scope.backlog = [];
        $scope.done = [];
        $scope.working = [];

        $scope.models = {
            selected: null,
            boards: {
                backlog: $scope.backlog,
                working: $scope.working,
                done: $scope.done
            }
        };

        $scope.getStoryId = function (id) {
            storyId = id;
        };

        $scope.updateStory = function(event, index, item) {
            var board = event.path[2].className;
            var story = pivotTrakerService.story.get({ id: storyId });

            if (board.indexOf('done') !== -1) {
                story.current_state = 'accepted';
            }

            if (board.indexOf('working') !== -1) {
                story.current_state = 'started';
            }

            if (board.indexOf('backlog') !== -1) {
                story.current_state = 'unstarted';
            }

            pivotTrakerService.story.update({ id: storyId }, { current_state: story.current_state }, function (result) {
                story = result;
            });

            return item;
        };

        // set initial data
        pivotTrakerService.stories.query(function (data) {
            angular.forEach(data, function (story) {
                if (story.current_state === 'unstarted') {
                    $scope.backlog.push(story);
                }

                if (story.current_state === 'started' || story.current_state === 'finished' || story.current_state === 'delivered') {
                    $scope.working.push(story);
                }

                if (story.current_state === 'accepted') {
                    $scope.done.push(story);
                }
            });
        });

    }
})();