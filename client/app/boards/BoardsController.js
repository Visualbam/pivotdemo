(function () {
    'use strict';

    angular
        .module('app')
        .controller('BoardsController', BoardsController);

    BoardsController.$inject = ['pivotTrakerService', '$scope'];

    function BoardsController(pivotTrakerService, $scope) {
        // interface
        $scope.title = '';
        $scope.models = {
            selected: null,
            boards: {
                working: [],
                done: [],
                backlog: []
            }
        };

        $scope.logEvent = function(message, event) {
            console.log(message, '(triggered by the following', event.type, 'event)');
            console.log(event);
        };

        pivotTrakerService.profile.get(function (data) {
            $scope.title = data.email;
        });

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