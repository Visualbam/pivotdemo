(function () {
    'use strict';

    angular
        .module('app')
        .controller('StoriesController', StoriesController);

    StoriesController.$inject = ['pivotTrakerService', '$scope', 'Board'];

    function StoriesController(pivotTrakerService, $scope, Board) {
        // properties
        $scope.boards = [];
        $scope.stories = [];

        // build boards
        $scope.backlog = Board.build('Backlog', ['unstarted']);
        $scope.working = Board.build('Working', ['started', 'finished', 'delivered', 'rejected']);
        $scope.done = Board.build('Done', ['accepted']);

        // get stories and sort board they belong to
        // TODO: come up with a better way to filter using allowedTypes
        pivotTrakerService.stories.query(function (stories) {
            angular.forEach(stories, function (data) {
                $scope.story = {
                    id: data.id,
                    name: data.name,
                    current_state: data.current_state
                }

                if (data.current_state === 'unstarted') {
                    $scope.backlog.list.push($scope.story);
                }

                else if (data.current_state === 'started' || data.current_state === 'finished' || data.current_state === 'delivered' || data.current_state === 'rejected') {
                    $scope.working.list.push($scope.story);
                }

                else if (data.current_state === 'accepted') {
                    $scope.done.list.push($scope.story);
                }
            });
        });

        // create boards array with generated boards
        $scope.boards.push($scope.backlog, $scope.working, $scope.done);

        $scope.updateStory = function (event, index, item) {
            var board = event.path[2].className;

            if (board.indexOf('Backlog') !== -1) {
                item.current_state = 'unstarted';
                $scope.backlog.list.push(item);
            }

            if (board.indexOf('Working') !== -1) {
                item.current_state = 'started';
                $scope.working.list.push(item);
            }

            if (board.indexOf('Done') !== -1) {
                item.current_state = 'accepted';
                $scope.done.list.push(item);
            }

            pivotTrakerService.story.update({ id: item.id }, item);
        };
    }
})();