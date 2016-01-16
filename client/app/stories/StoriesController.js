(function () {
    'use strict';

    angular
        .module('app')
        .controller('StoriesController', StoriesController);

    StoriesController.$inject = ['pivotTrakerService', '$scope', 'Board'];

    function StoriesController(pivotTrakerService, $scope, Board) {
        var storyId,
            backlog,
            working,
            done;

        // properties
        $scope.stories = [];
        $scope.boards = [];

        // build boards
        backlog = Board.build('Backlog', ['unstarted']);
        working = Board.build('Working', ['started', 'finished', 'delivered', 'rejected']);
        done = Board.build('Done', ['accepted']);

        $scope.boards.push(backlog, working, done);

        // handle stories
        // set initial data
        pivotTrakerService.stories.query(function (data) {
            $scope.stories = data;
        });

        $scope.getStoryId = function (event, id) {
            storyId = id;
        };

        $scope.updateStory = function (event, index, item) {
            var board = event.path[2].className,
                Story;

            pivotTrakerService.story.get({ id: storyId }, function (result) {
                Story = result;

                $scope.stories.map(function (object, objectIndex) {
                    if (object.id === Story.id) {
                        $scope.stories.splice(objectIndex, 1);
                    }
                });

                if (board.indexOf('Backlog') !== -1) {
                    Story.current_state = 'unstarted';
                }

                if (board.indexOf('Working') !== -1) {
                    Story.current_state = 'started';
                }

                if (board.indexOf('Done') !== -1) {
                    Story.current_state = 'accepted';
                }

                pivotTrakerService.story.update({ id: storyId }, { current_state: Story.current_state }, function (result) {
                    Story = result;
                    $scope.stories.push(Story);
                });
            });

            return Story;
        };
    }
})();