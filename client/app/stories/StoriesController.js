(function () {
    'use strict';

    angular
        .module('app')
        .controller('StoriesController', StoriesController);

    StoriesController.$inject = ['pivotTrakerService', '$scope'];

    function StoriesController(pivotTrakerService, $scope) {
        $scope.stories = [];

        pivotTrakerService.stories.query(function (stories) {
            angular.forEach(stories, function (data) {
                $scope.story = {
                    id: data.id,
                    name: data.name,
                    current_state: data.current_state
                }

                $scope.stories.push($scope.story);
            });
        });

        $scope.removeStoryNode = function (event, storyId) {
            var element = event.srcElement;
            element.parentNode.removeChild(element);
        };

        $scope.updateStory = function (event, index, item) {
            var board = event.path[2].parentElement.className;

            if (board.indexOf('Backlog') !== -1) {
                item.current_state = 'unstarted';
            }

            if (board.indexOf('Working') !== -1) {
                item.current_state = 'started';
            }

            if (board.indexOf('Done') !== -1) {
                item.current_state = 'accepted';
            }

            pivotTrakerService.story.update({ id: item.id }, item);
            $scope.stories.push(item);
        };

    }
})();